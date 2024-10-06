import { createSlice } from '@reduxjs/toolkit'
import { SLICE_AUTH } from './type'
import { first } from 'lodash'

const authInitialState = {
  account: null,
  paymentHistories: [],
  isLoading: false,
  errors: null,
}

export const authSlice = createSlice({
  name: SLICE_AUTH,
  initialState: authInitialState,
  reducers: {
    login: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    loginSuccess: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
      }
    },
    loginFailed: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: 'Có lỗi xả xảy ra vui lòng thử lại',
      }
    },
    signUp: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    signUpSuccess: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
      }
    },
    signUpFailed: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: 'Có lỗi xả xảy ra vui lòng thử lại',
      }
    },
    logout: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    getAccountInfo: (state) => {
      return { ...state, isLoading: true, errors: null }
    },
    getAccountInfoSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
        account: first(action.payload),
      }
    },
    getAccountInfoFailed: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
      }
    },
    getListPayment: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
    getListPaymentSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
        paymentHistories: action.payload,
      }
    },
    getListPaymentFailed: (state) => {
      return {
        ...state,
        isLoading: false,
        errors: null,
      }
    },
  },
})

export const {
  logout,
  login,
  loginSuccess,
  loginFailed,
  getAccountInfo,
  getAccountInfoSuccess,
  getAccountInfoFailed,
  signUp,
  signUpSuccess,
  signUpFailed,
  getListPayment,
  getListPaymentSuccess,
  getListPaymentFailed
} = authSlice.actions
export default authSlice.reducer
