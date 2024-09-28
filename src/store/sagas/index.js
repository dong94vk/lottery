import { all, fork } from 'redux-saga/effects'
import {
  watchDoGetHistory,
  watchDoGetSetting,
  watchDoSubmitBet,
  watchDoSubmitBetBatch,
} from './bigAndSmall'
import {
  watchDoGetHistory as watchDoGetHistoryLottery,
  watchDoGetSetting as watchDoGetSettingLottery,
  watchDoSubmitBet as watchDoSubmitBetLottery,
  watchDoSubmitBetBatch as watchDoSubmitBetBatchLottery,
} from './lottery'
import {
  watchDoGetAccountInfo,
  watchDoLogin,
  watchDoSignUp,
} from './authentication'

const rootSaga = function* () {
  yield all([
    fork(watchDoGetSetting),
    fork(watchDoGetHistory),
    fork(watchDoSubmitBet),
    fork(watchDoSubmitBetBatch),
    fork(watchDoGetAccountInfo),
    fork(watchDoGetHistoryLottery),
    fork(watchDoGetSettingLottery),
    fork(watchDoSubmitBetLottery),
    fork(watchDoSubmitBetBatchLottery),
    fork(watchDoLogin),
    fork(watchDoSignUp),
  ])
}

export default rootSaga
