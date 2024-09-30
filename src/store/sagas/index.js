import { all, fork } from 'redux-saga/effects'
import {
  watchDoGetHistory as watchDoGetHistoryBigAndSmall,
  watchDoGetSetting as watchDoGetSettingBigAndSmall,
  watchDoSubmitBet as watchDoSubmitBetBigAndSmall,
  watchDoSubmitBetBatch as watchDoSubmitBetBatchBigAndSmall,
  watchDoGetCurrentBetResult as watchDoGetCurrentBetResultBigAndSmall,
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
    fork(watchDoGetSettingBigAndSmall),
    fork(watchDoGetHistoryBigAndSmall),
    fork(watchDoSubmitBetBigAndSmall),
    fork(watchDoSubmitBetBatchBigAndSmall),
    fork(watchDoGetCurrentBetResultBigAndSmall),
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
