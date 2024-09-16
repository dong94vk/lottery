export const API_URL = {
  AUTH: {
    LOGIN: 'users/tokens/sign_in',
    SIGN_UP: 'users/tokens/sign_up',
    REFRESH_TOKEN: 'users/tokens/refresh_token',
    ACCOUNT_INFO: 'player/account',
  },
  GAME: {
    GET_HISTORY: 'game',
    GET_SETTING: 'schema/:gameCode',
    SUBMIT_BET: 'player/bet',
    GET_BET_HISTORY: 'player/bet',
  },
}

export const BASE_URL = process.env.REACT_APP_HOST
