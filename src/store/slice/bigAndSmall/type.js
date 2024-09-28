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

export const SUBMIT_BET_BATCH = `${SLICE_GAME}/submitBetBatch`
export const SUBMIT_BET_BATCH_SUCCESS = `${SLICE_GAME}/submitBetBatchSuccess`
export const SUBMIT_BET_BATCH_FAILED = `${SLICE_GAME}/submitBetBatchFailed`

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
  const histories = []
  payload.forEach((data) => {
    const { attributes = {} } = data
    // trạng thái active => game đang chạy => ko phải lịch sử
    if (attributes.status !== 'active') {
      const { prize = [] } = attributes
      histories.push({
        id: data.id,
        created_at: attributes.created_at,
        end_at: attributes.end_at,
        prize: attributes.win_prize?.split(','),
        current_pot: attributes.current_pot,
        ticket_count: attributes?.ticket_count || 0,
        status: attributes.status,
        jackpot: prize.find(priz => +priz.data.attributes.ordering === 1)?.quantity,
        secondPrize: prize.find(priz => +priz.data.attributes.ordering === 2)?.quantity,
        thirdPrize: prize.find(priz => +priz.data.attributes.ordering === 3)?.quantity,
        fourthPrize: prize.find(priz => priz.data.attributes.ordering === 4)?.quantity,
        bet_value: [],
      })
    }
  })
  return histories
}

export const formatPrizeData = (payload) => {
  const data = first(payload)?.attributes?.prize
  const prizes = sortBy(
    map(flatMap(data), (item) => item.data.attributes),
    'ordering',
  )

  const getIconByName = (priceName) => {
    if (priceName === 'Jackport') return 'firstPrize'
    if (priceName === 'First price') return 'secondPrize'
    // if (priceName === 'First price') return 'firstPrize'
    // if (priceName === 'Second price') return 'secondPrize'
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
  const rawCurrentBet = payload.find(
    (data) => data.attributes.status === 'active', // trạng thái active => game đang chạy => ko phải lịch sử,
  )
  if (!rawCurrentBet) return {}
  return {
    id: rawCurrentBet?.id,
    created_at: rawCurrentBet?.attributes.created_at,
    end_at: rawCurrentBet?.attributes.end_at,
    prize: rawCurrentBet?.attributes.win_prize?.split(','),
    current_pot: rawCurrentBet.attributes.current_pot,
    status: rawCurrentBet.attributes.status,
    bet_value: [],
  }
}
