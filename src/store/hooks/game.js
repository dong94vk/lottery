import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { gameSlice } from '../slice/game'

function useGame() {
  const data = useSelector((state) => get(state, 'lottery'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(gameSlice.actions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useGame