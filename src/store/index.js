import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import bigAndSmall from './slice/bigAndSmall'
import lottery from './slice/lottery'
import auth from './slice/authentication'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }).prepend([sagaMiddleware])
}

const rootReducer = combineReducers({
  auth: auth,
  bigAndSmall: bigAndSmall,
  lottery: lottery
})

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})

sagaMiddleware.run(rootSaga)

export default store
