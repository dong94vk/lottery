import { createSlice } from '@reduxjs/toolkit'
import { SLICE_LOTTERY } from './type'
import { dummyHistory, dummySetting } from 'src/dummy'
import { first } from 'lodash'

const initialState = {
  setting: {
    range: { min: 0, max: 45 },
    numberQuantity: 6,
    isDuplicate: true,
  },
  histories: [],
  currentBet: null,
  isLoading: false,
}

export const lotterySlice = createSlice({
  name: SLICE_LOTTERY,
  initialState: initialState,
  reducers: {
    getSetting: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    getSettingSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
      }
    },
    getSettingFailed: (state, action) => {
      return {
        ...state,
        setting: dummySetting,
        isLoading: false,
        errors: 'Có lỗi xảy ra vui lòng thử lại',
      }
    },
    getHistory: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    getHistorySuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        histories: dummyHistory,
        currentBet: first(dummyHistory),
        errors: null,
      }
    },
    getHistoryFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        histories: dummyHistory,
        currentBet: first(dummyHistory),
        errors: null,
      }
    },
    submitBet: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetSuccess: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetFailed: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
  },
})

export const {
  getSetting,
  getSettingSuccess,
  getSettingFailed,
  getHistory,
  getHistorySuccess,
  getHistoryFailed,
  submitBet,
  submitBetSuccess,
  submitBetFailed
} = lotterySlice.actions
export default lotterySlice.reducer
