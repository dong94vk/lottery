import { all, fork } from 'redux-saga/effects'
import {
  watchDoGetHistory,
  watchDoGetSetting,
  watchDoSubmitBet,
} from './lottery'

const rootSaga = function* () {
  yield all([
    fork(watchDoGetSetting),
    fork(watchDoGetHistory),
    fork(watchDoSubmitBet),
  ])
}

export default rootSaga
