import { createSlice } from '@reduxjs/toolkit'
import { SLICE_AUTH } from './type'

const authInitialState = {
  data: [],
  isLoading: false,
  errors: null,
}

export const authSlice = createSlice({
  name: SLICE_AUTH,
  initialState: authInitialState,
  reducers: {
    login: ({ payload }) => {
      return {
        payload,
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
    logout: (state) => {
      return {
        ...state,
        isLoading: true,
        errors: null,
      }
    },
  },
})

export const { logout, login, loginSuccess, loginFailed } = authSlice.actions
export default authSlice.reducer
