import { createSlice } from '@reduxjs/toolkit'
import {
  formatCurrentBetData,
  formatDataHistory,
  formatPrizeData,
  formatSettingData,
  SLICE_LOTTERY,
} from './type'
import { defaultSetting } from 'src/dummy'

const initialState = {
  setting: defaultSetting,
  histories: [],
  prizes: [],
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
        setting: formatSettingData(action.payload),
        isLoading: false,
        errors: null,
      }
    },
    getSettingFailed: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: 'Có lỗi xảy ra vui lòng thử lại',
      }
    },
    getHistory: (state) => {
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
        histories: formatDataHistory(action.payload),
        prizes: formatPrizeData(action.payload),
        currentBet: formatCurrentBetData(action.payload),
        errors: null,
      }
    },
    getHistoryFailed: (state) => {
      return {
        ...state,
        isLoading: false,
        histories: [],
        currentBet: formatCurrentBetData([]),
        errors: 'Có lỗi xảy ra vui lòng thử lại',
      }
    },
    submitBet: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetSuccess: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetFailed: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetBatch: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetBatchSuccess: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    submitBetBatchFailed: (state) => {
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
  submitBetFailed,
  submitBetBatch,
  submitBetBatchSuccess,
  submitBetBatchFailed
} = lotterySlice.actions
export default lotterySlice.reducer
