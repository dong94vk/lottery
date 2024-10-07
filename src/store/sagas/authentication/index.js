import { first } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'src/services/api'
import { API_URL } from 'src/services/api/constant'
import {
  getAccountInfoFailed,
  getAccountInfoSuccess,
  getConfigFailed,
  getConfigSuccess,
  getListPaymentFailed,
  getListPaymentSuccess,
  loginFailed,
  signUpFailed,
} from 'src/store/slice/authentication'
import {
  GET_ACCOUNT_INFO,
  GET_CONFIG,
  GET_LIST_PAYMENT,
  LOGIN,
  SIGN_UP,
} from 'src/store/slice/authentication/type'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'

/** start login */
const apiLogin = (params) => {
  return api.post(API_URL.AUTH.LOGIN, params)
}

function* doLogin({ payload }) {
  try {
    const response = yield call(apiLogin, payload.body)
    // Save token to local storage
    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('refreshToken', response.refresh_token)
      if (payload.onSuccess) {
        yield payload.onSuccess()
      }
    }
  } catch (error) {
    yield put(loginFailed(error))
  }
}

/** end login */

/** start get account info */
const apiGetAccountInfo = () => {
  return api.get(API_URL.AUTH.ACCOUNT_INFO)
}

function* doGetAccountInfo({ payload }) {
  try {
    const response = yield call(apiGetAccountInfo)
    if (response.status !== 200) {
      yield put(getAccountInfoFailed())
    }
    yield put(getAccountInfoSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(getAccountInfoFailed(error))
  }
}
/** end get account info */

/** start sign up */
const apiSignUp = (params) => {
  return api.post(API_URL.AUTH.SIGN_UP, params)
}

function* doSignUp({ payload }) {
  try {
    const response = yield call(apiSignUp, payload.body)
    // Save token to local storage
    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('refreshToken', response.refresh_token)
      if (payload.onSuccess) {
        yield payload.onSuccess()
      }
    } else if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    } else {
      addNotification(
        'Something went wrong. Please try again!',
        NOTIFICATION_TYPE.ERROR,
      )
    }
  } catch (error) {
    addNotification(
      'Something went wrong. Please try again!',
      NOTIFICATION_TYPE.ERROR,
    )
    yield put(signUpFailed(error))
  }
}
/** end sign up */

/** start get list payment*/
export const apiListPayment = (payload) => {
  return api.get(API_URL.AUTH.LIST_PAYMENT, payload)
}

function* doGetListPayment({ payload }) {
  try {
    const response = yield call(apiListPayment, payload)
    if (response.status !== 200) {
      yield put(getListPaymentSuccess())
    }
    yield put(getListPaymentSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(getListPaymentFailed(error))
  }
}
/** end get list payment */

/** start get config */
export const apiGetConfig = () => {
  return api.get(API_URL.AUTH.API_CONFIG)
}
function* doGetConfig({ payload }) {
  try {
    const response = yield call(apiGetConfig, payload)
    if (response.status !== 200) {
      yield put(getConfigFailed())
    }
    yield put(getConfigSuccess(response))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(getConfigFailed(error))
  }
}
/** end get config */

/** start api payment */
export const apiCreatePayment = (payload) => {
  return api.post(API_URL.AUTH.CREATE_PAYMENT, payload)
}

export const apiCreatePayout = (payload) => {
  return api.post(API_URL.AUTH.CREATE_PAYOUT, payload)
}

export const apiRefreshPayment = (payload) => {
  return api.get(API_URL.AUTH.REFRESH_PAYMENT, payload)
}

/** end api payment */

export function* watchDoLogin() {
  yield takeLatest(LOGIN, doLogin)
}

export function* watchDoGetAccountInfo() {
  yield takeLatest(GET_ACCOUNT_INFO, doGetAccountInfo)
}

export function* watchDoSignUp() {
  yield takeLatest(SIGN_UP, doSignUp)
}

export function* watchDoGetListPayment() {
  yield takeLatest(GET_LIST_PAYMENT, doGetListPayment)
}

export function* watchDoGetConfig() {
  yield takeLatest(GET_CONFIG, doGetConfig)
}
