import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authSlice } from '../slice/authentication'


function useAuth() {
  const data = useSelector((state) => get(state, 'auth'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(authSlice.actions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useAuth
