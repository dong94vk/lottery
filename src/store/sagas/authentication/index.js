import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'src/services/api'
import { API_URL } from 'src/services/api/constant'
import { loginFailed } from 'src/store/slice/authentication'
import { LOGIN_START } from 'src/store/slice/authentication/type'

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

export default function* watchDoLogin() {
  yield takeLatest(LOGIN_START, doLogin)
}
