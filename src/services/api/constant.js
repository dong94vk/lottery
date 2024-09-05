export const API_URL = {
  AUTH: {
    LOGIN: 'users/tokens/sign_in',
    REFRESH_TOKEN: 'users/tokens/refresh_token',
    ACCOUNT_INFO: 'player/account'
  },
  LOTTERY: {
    GET_HISTORY: 'game',
    GET_SETTING: 'schema/LT6452',
    SUBMIT_BET: 'player/bet',
    GET_BET_HISTORY: 'player/bet',
  },
}

export const BASE_URL = process.env.REACT_APP_HOST
