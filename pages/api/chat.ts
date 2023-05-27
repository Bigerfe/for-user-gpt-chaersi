import { ChatBody, Message, OpenAIModelID } from "@/types";
import { DEFAULT_SYSTEM_PROMPT } from "@/utils/app/const";

import { OpenAIStream } from "@/utils/server";
import tiktokenModel from "@dqbd/tiktoken/encoders/cl100k_base.json";
import { init, Tiktoken } from "@dqbd/tiktoken/lite/init";
import md5 from "@/utils/common/client-md5";
// @ts-expect-error
import wasm from "../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module";
import CustomKey from '../../utils/common/custom-key';

export const config = {
  runtime: "edge"
};

// 获得签名
function getSign(messages: Array<any>, time: string) {
  const msg:any = messages.length ? messages[messages.length - 1] : '';
  const PubSignKey = 'chatgpt-bigerfe-start-$%^&*()_';
  return md5(`${time}${msg.content}${time}${PubSignKey}`);
}

const handler = async (req: Request): Promise<Response> => {
  try {
    const { model, messages, key, prompt, t, sign, other } = (await req.json()) as ChatBody;
    if(other !== 'chatgpt-bigerfe-req-!@#$%^&*()'){
      if(+new Date() - parseInt(t || '0',10) > 5000){
        return new Response(`Error-111,请求过期~`);
      } 
      if(getSign(messages, t || '0') !== sign){
        //签名验证
        return new Response(`Error-222,验证错误~`);
      }
    }
    if(CustomKey.getDefaultKey(key) === CustomKey.ErrorCode.cardDisable){
      return new Response(`卡密已过期，请重新去公众号(程序员饭哥)获取，回复"卡密"领取. 请新建对话提问~`); 
    }
    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(tiktokenModel.bpe_ranks, tiktokenModel.special_tokens, tiktokenModel.pat_str);

    const tokenLimit = model.id === OpenAIModelID.GPT_4 ? 6000 : 3000;
    let tokenCount = 0;
    let messagesToSend: Message[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length > tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    const stream = await OpenAIStream(model, promptToSend, CustomKey.getDefaultKey(key), messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
