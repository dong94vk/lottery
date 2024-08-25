import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { lotterySlice } from '../slice/lottery'

function useLottery() {
  const data = useSelector((state) => get(state, 'lottery'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(lotterySlice.actions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useLottery
