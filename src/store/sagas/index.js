import { all, fork } from 'redux-saga/effects'
import {
  watchDoGetHistory,
  watchDoGetSetting,
  watchDoSubmitBet,
} from './game'
import { watchDoGetAccountInfo, watchDoLogin } from './authentication'

const rootSaga = function* () {
  yield all([
    fork(watchDoGetSetting),
    fork(watchDoGetHistory),
    fork(watchDoSubmitBet),
    fork(watchDoGetAccountInfo),
    fork(watchDoLogin)
  ])
}

export default rootSaga
