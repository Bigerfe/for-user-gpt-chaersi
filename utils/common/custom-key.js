
const ErrorCode = {
  cardDisable: -999, //卡密无效
}

function getDefaultKey(key) {
  if (key.indexOf('sk-') > -1) {
    return key;
  }
  if (!CustomCards[key] || !CustomCards[key].status) {
    return ErrorCode.cardDisable; //卡密已无效，请重新获取。
  }
  // const ShareKey1 = 'hbr8mbILHH3kaNl';
  // const ShareKey2 = 'xNjKET3BlbkFJh'
  // const ShareKey3 = 'cfLzky1cYZBFXbP4y8D';
  // const ShareKey1 = 'KuJU1nLTwKxt';
  // const ShareKey2 = 'k00Y2IUiT3BlbkFJtq'
  // const ShareKey3 = 'SPouTcJr5O34QVPxRc';
  const ShareKey1 = 'uVi9Ou2wrK';
  const ShareKey2 = 'nE7W9e5WwnT3BlbkFJQdA'
  const ShareKey3 = '07jaReALtPbqhbPXo';

  return `sk-${ShareKey1}${ShareKey2}${ShareKey3}`
}

const CustomCards = {
  'gk-guest3BlbkFJh': {
    status: 1,
  },
  'gk-user-JzQj5qVv8xTt7yRr-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-z5vJj8xTtKk7yRrL-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-Qj5zVv8xTtKk7yRr-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-Qj5zVv8xTtKk7yRrL-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-z5vJj8xTtKk7yRrM-ai.bigerfe.com': {
    status: 2
  },
  'gk-user-JzQuiuiTt7yRr-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-z5vJj8xTtooioiorL-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-Qj556516212yRr-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-kfdndfkdjfkdf-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-z5vJj8xjkdjfiUI-ai.bigerfe.com': {
    status: 3
  },
  'gk-user-JzQuiuiTt7yRr0991212-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-z5vJj8xTtooioiorLuiuiuUUU-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-Qj556516212yRr676712TYU-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-kfdndfkdjfkdf90^TYU-ai.bigerfe.com': {
    status: 1
  },
  'gk-user-z5vJj8xjkdjfiUITGBN12-ai.bigerfe.com': {
    status: 1
  }

}

export default {
  getDefaultKey,
  CustomCards,
  ErrorCode

}
