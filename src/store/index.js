import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import lottery from './slice/lottery'
import authReducer from './slice/authentication'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }).prepend([sagaMiddleware])
}

const rootReducer = combineReducers({
  auth: authReducer,
  lottery: lottery,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})

sagaMiddleware.run(rootSaga)

export default store
