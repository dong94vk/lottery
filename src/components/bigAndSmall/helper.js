import dayjs from 'dayjs'
import { bigNumber } from './History/constant'

export const winningContent = (winning) => {
  const numbers = winning?.split(',')
  const total = numbers?.reduce((a, b) => +a + +b, 0)
  const displayNumber = numbers?.join('-')
  if (total >= bigNumber) {
    return `BIG(${displayNumber})`
  }
  return `SMALL(${displayNumber})`
}

/**
[{
      time: '23/07/2024',
      session: '55',
      winning: '4,5,6',
      yourReward: '10,000',
}] 
 */
export const formatHistory = (histories) => {
  return histories.map((history) => {
    return {
      time: dayjs(history.created_at).format('DD/MM/YYYY'),
      session: history.id,
      winning: history?.prize?.join(','),
      yourReward: history.current_pot,
    }
  })
}

export const getBigAndSmallResult = (winning) => {
  const numbers = winning?.split(',')
  const total = numbers?.reduce((a, b) => +a + +b, 0)
  if (total >= bigNumber) {
    return 'BIG'
  }
  if (total < bigNumber) {
    return 'SMALL'
  }
  return '???'
}