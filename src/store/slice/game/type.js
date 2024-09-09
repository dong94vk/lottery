import { first, flatMap, map, sortBy } from 'lodash'

export const SLICE_GAME = 'SLICE_GAME'

export const GET_SETTING = `${SLICE_GAME}/getSetting`
export const GET_SETTING_SUCCESS = `${SLICE_GAME}/getSettingSuccess`
export const GET_SETTING_FAILED = `${SLICE_GAME}/getSettingFailed`

export const GET_HISTORY = `${SLICE_GAME}/getHistory`
export const GET_HISTORY_SUCCESS = `${SLICE_GAME}/getHistorySuccess`
export const GET_HISTORY_FAILED = `${SLICE_GAME}/getHistoryFailed`

export const SUBMIT_BET = `${SLICE_GAME}/submitBet`
export const SUBMIT_BET_SUCCESS = `${SLICE_GAME}/submitBetSuccess`
export const SUBMIT_BET_FAILED = `${SLICE_GAME}/submitBetFailed`

export const formatSettingData = (payload) => {
  const data = payload.attributes
  return {
    range: {
      min: data.range_from,
      max: data.range_to,
    },
    numberQuantity: data.win_number,
    price: data.price || 1,
    isDuplicate: data.duplicate,
  }
}

export const formatDataHistory = (payload) => {
  return payload.map((data) => {
    const { attributes = {} } = data
    return {
      id: data.id,
      created_at: attributes.created_at,
      end_at: attributes.end_at,
      prize: attributes.win_prize?.split(','),
      current_pot: attributes.current_pot,
      status: attributes.status,
      bet_value: [],
    }
  })
}

export const formatPrizeData = (payload) => {
  const data = first(payload)?.attributes?.prize
  const prizes = sortBy(
    map(flatMap(data), (item) => item.data.attributes),
    'ordering',
  )

  const getIconByName = (priceName) => {
    if (priceName === 'First price') return 'firstPrize'
    if (priceName === 'Second price') return 'secondPrize'
    return 'thirdPrize'
  }

  return (prizes || []).map((price) => {
    return {
      prize: price.prize,
      name: price.name,
      icon: getIconByName(price.name),
    }
  })
}

export const formatCurrentBetData = (payload) => {
  return first(formatDataHistory(payload))
}
