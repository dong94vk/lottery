import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getSettingSuccess,
  getSettingFailed,
  getHistoryFailed,
  getHistorySuccess,
  submitBetFailed,
  submitBetSuccess,
  submitBetBatchFailed,
  submitBetBatchSuccess,
  getCurrentBetResultFailed,
  getCurrentBetResultSuccess,
} from 'src/store/slice/bigAndSmall'
import {
  GET_CURRENT_BET_RESULT,
  GET_HISTORY,
  GET_SETTING,
  SUBMIT_BET,
  SUBMIT_BET_BATCH,
} from 'src/store/slice/bigAndSmall/type'
import { api } from 'src/services/api'
import { API_URL } from 'src/services/api/constant'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { first } from 'lodash'

/* start get setting */
export const apiGetSetting = (params) => {
  return api.get(API_URL.GAME.GET_SETTING.replace(':gameCode', params))
}

function* doGetSetting({ payload }) {
  try {
    const response = yield call(apiGetSetting, payload)
    if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    }
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

// payload example: { code: 'TX1', page: 1, limit: 5 }
export const apiGetHistory = (payload) => {
  return api.get(API_URL.GAME.GET_HISTORY, payload)
}

// payload example { game_id: 58361 }
export const apiBetHistory = (payload) => {
  return api.get(API_URL.GAME.GET_BET_HISTORY, payload)
}

function* doGetHistory({ payload }) {
  try {
    const response = yield call(apiGetHistory, payload)
    if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    }
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

/* start get current bet result */
function* doGeCurrentBetResult({ payload }) {
  try {
    const response = yield call(apiGetHistory, payload)
    if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    }
    if (response?.status !== 200) {
      yield put(getCurrentBetResultFailed())
    }
    yield put(getCurrentBetResultSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
    if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    }
  } catch (error) {
    yield put(getCurrentBetResultFailed(error))
  }
}
/* end get current bet result */

/* start submit bet */
export const apiSubmitBet = (payload) => {
  return api.post(API_URL.GAME.SUBMIT_BET, payload)
}

function* doSubmitBet({ payload }) {
  try {
    const response = yield call(apiSubmitBet, payload.body)
    if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    }
    if (!response?.data) {
      yield put(submitBetFailed())
    }
    yield put(submitBetSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    if (payload.onFailed) {
      yield payload.onFailed()
    }
    yield put(submitBetFailed(error))
  }
}

/* end submit bet */

/* start submit bet batch */
export const apiSubmitBetBatch = (payload) => {
  return api.post(API_URL.GAME.SUBMIT_BET_BATCH, payload)
}

function* doSubmitBetBatch({ payload }) {
  try {
    const response = yield call(apiSubmitBetBatch, payload.body)
    if (response.error) {
      addNotification(
        first(response.error_description),
        NOTIFICATION_TYPE.ERROR,
      )
    }
    if (!response?.data) {
      yield put(submitBetBatchFailed())
    }
    yield put(submitBetBatchSuccess(response.data))
    if (payload.onSuccess) {
      yield payload.onSuccess()
    }
  } catch (error) {
    yield put(submitBetBatchFailed(error))
  }
}

/* end submit bet batch*/

/** api get bet joined*/
export const apiGetBetJoined = () => {
  return api.get(API_URL.GAME.GET_BET_JOINED)
}

export function* watchDoGetSetting() {
  yield takeLatest(GET_SETTING, doGetSetting)
}

export function* watchDoGetHistory() {
  yield takeLatest(GET_HISTORY, doGetHistory)
}

export function* watchDoSubmitBet() {
  yield takeLatest(SUBMIT_BET, doSubmitBet)
}

export function* watchDoSubmitBetBatch() {
  yield takeLatest(SUBMIT_BET_BATCH, doSubmitBetBatch)
}

export function* watchDoGetCurrentBetResult() {
  yield takeLatest(GET_CURRENT_BET_RESULT, doGeCurrentBetResult)
}