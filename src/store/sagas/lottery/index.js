import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getSettingSuccess,
  getSettingFailed,
  getHistoryFailed,
  getHistorySuccess,
  submitBetFailed,
  submitBetSuccess,
} from 'src/store/slice/lottery'
import {
  GET_HISTORY,
  GET_SETTING,
  SUBMIT_BET,
} from 'src/store/slice/lottery/type'
import { api } from 'src/services/api'
import { API_URL } from 'src/services/api/constant'

/* start get setting */
export const apiGetSetting = () => {
  return api.get(API_URL.LOTTERY.GET_SETTING)
}

function* doGetSetting({ payload }) {
  try {
    const response = yield call(apiGetSetting, payload)
    if (response?.status !== 200) {
      yield put(getSettingFailed())
    }
    yield put(getSettingSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(getSettingFailed(error))
  }
}
/* end get setting */

/* start get setting */
export const apiGetHistory = (payload) => {
  return api.get(API_URL.LOTTERY.GET_HISTORY, payload)
}

export const apiBetHistory = (payload) => {
  return api.get(API_URL.LOTTERY.GET_BET_HISTORY, payload)
}

function* doGetHistory({ payload }) {
  try {
    const response = yield call(apiGetHistory, payload)
    if (response?.status !== 200) {
      yield put(getHistoryFailed())
    }
    yield put(getHistorySuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(getHistoryFailed(error))
  }
}
/* end get setting */

/* start submit bet */
export const apiSubmitBet = (payload) => {
  return api.post(API_URL.LOTTERY.SUBMIT_BET, payload)
}

function* doSubmitBet({ payload }) {
  try {
    const response = yield call(apiSubmitBet, payload)
    if (!response?.data) {
      yield put(submitBetFailed())
    }
    yield put(submitBetSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(submitBetFailed(error))
  }
}
/* end submit bet */

export function* watchDoGetSetting() {
  yield takeLatest(GET_SETTING, doGetSetting)
}
export function* watchDoGetHistory() {
  yield takeLatest(GET_HISTORY, doGetHistory)
}
export function* watchDoSubmitBet() {
  yield takeLatest(SUBMIT_BET, doSubmitBet)
}
