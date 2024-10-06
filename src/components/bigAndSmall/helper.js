import dayjs from 'dayjs'
import { bigNumber } from './History/constant'
import { BET_VALUE } from './BetZone/constant'

export const winningContent = (winning) => {
  const numbers = winning?.split(',')
  const total = numbers?.reduce((a, b) => +a + +b, 0)
  const displayNumber = numbers?.join('-')
  if (total >= bigNumber) {
    return `BIG(${displayNumber})`
  }
  if (total < bigNumber) {
    return `SMALL(${displayNumber})`
  }
  return '?'
}

/**
[{
  time: '23/07/2024',
  session: '55',
  winning: '4,5,6',
  yourReward: '10,000',
  yourPick: BIG_1231,
}] 
 */
export const formatHistory = (histories) => {
  return histories.map((history) => {
    return {
      time: dayjs(history.created_at).format('DD/MM/YYYY'),
      session: history.id,
      winning: history?.prize?.join(','),
      yourReward: formatYourReward(history),
      yourPick: formatYourPick(history),
    }
  })
}

const formatYourPick = (history) => {
  let betValue = 'NON-PICK'
  if (+history?.attributes?.bet_value === +BET_VALUE.SMALL) {
    betValue = `SMALL_${history?.attributes?.bet_amount}`
  }
  if (+history?.attributes?.bet_value === +BET_VALUE.BIG) {
    betValue = `BIG_${history?.attributes?.bet_amount}`
  }
  return betValue
}

const formatYourReward = (history) => {
  return history?.attributes?.win_amount || '?'
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
