import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'src/services/api'
import { API_URL } from 'src/services/api/constant'
import {
  getAccountInfoFailed,
  getAccountInfoSuccess,
  loginFailed,
} from 'src/store/slice/authentication'
import {
  GET_ACCOUNT_INFO,
  LOGIN_START,
} from 'src/store/slice/authentication/type'

/* start login */
const apiLogin = (params) => {
  return api.post(API_URL.AUTH.LOGIN, params)
}

function* doLogin({ payload }) {
  try {
    const response = yield call(apiLogin, payload)

    if (!response?.data && payload.onFailed) {
      yield payload.onFailed()
    }
    if (response?.statusCode === 200 && response?.data) {
      // Save token to local storage
      localStorage.setItem('token', response?.data?.accessToken)
      localStorage.setItem('refreshToken', response?.data?.refreshToken)

      if (payload.onSuccess) {
        yield payload.onSuccess()
      }
    }
  } catch (error) {
    yield put(loginFailed(error))
  }
}
/* end login */
const apiGetAccountInfo = () => {
  return api.get(API_URL.AUTH.ACCOUNT_INFO)
}

function* doGetAccountInfo(payload) {
  try {
    const response = yield call(apiGetAccountInfo, payload)
    if (response.status !== 200) {
      yield put(getAccountInfoFailed())
    }
    yield put(getAccountInfoSuccess(response.data))
  } catch (error) {
    yield put(getAccountInfoFailed(error))
  }
}

export function* watchDoLogin() {
  yield takeLatest(LOGIN_START, doLogin)
}

export function* watchDoGetAccountInfo() {
  yield takeLatest(GET_ACCOUNT_INFO, doGetAccountInfo)
}
