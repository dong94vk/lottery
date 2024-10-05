export const API_URL = {
  AUTH: {
    LOGIN: 'users/tokens/sign_in',
    SIGN_UP: 'users/tokens/sign_up',
    REFRESH_TOKEN: 'users/tokens/refresh_token',
    ACCOUNT_INFO: 'player/account',
    API_CONFIG: 'config',
    LIST_PAYMENT: 'payment',
    CREATE_PAYMENT: 'payment/create',
    REFRESH_PAYMENT: 'payment/refresh',
    CREATE_PAYOUT: 'payout/create',
  },
  GAME: {
    GET_HISTORY: 'game',
    GET_DETAIL_HISTORY: 'game/:gameId',
    GET_SETTING: 'schema/:gameCode',
    SUBMIT_BET: 'player/bet',
    SUBMIT_BET_BATCH: 'player/bet_batch',
    GET_BET_HISTORY: 'player/bet',
    GET_BET_JOINED: 'taixiu/live'
  },
}

export const BASE_URL = process.env.REACT_APP_HOST
