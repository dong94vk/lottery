import { first, flatMap, map, sortBy } from 'lodash'

export const SLICE_BIG_AND_SMALL = 'SLICE_BIG_AND_SMALL'

export const GET_SETTING = `${SLICE_BIG_AND_SMALL}/getSetting`
export const GET_SETTING_SUCCESS = `${SLICE_BIG_AND_SMALL}/getSettingSuccess`
export const GET_SETTING_FAILED = `${SLICE_BIG_AND_SMALL}/getSettingFailed`

export const GET_HISTORY = `${SLICE_BIG_AND_SMALL}/getHistory`
export const GET_HISTORY_SUCCESS = `${SLICE_BIG_AND_SMALL}/getHistorySuccess`
export const GET_HISTORY_FAILED = `${SLICE_BIG_AND_SMALL}/getHistoryFailed`

export const SUBMIT_BET = `${SLICE_BIG_AND_SMALL}/submitBet`
export const SUBMIT_BET_SUCCESS = `${SLICE_BIG_AND_SMALL}/submitBetSuccess`
export const SUBMIT_BET_FAILED = `${SLICE_BIG_AND_SMALL}/submitBetFailed`

export const SUBMIT_BET_BATCH = `${SLICE_BIG_AND_SMALL}/submitBetBatch`
export const SUBMIT_BET_BATCH_SUCCESS = `${SLICE_BIG_AND_SMALL}/submitBetBatchSuccess`
export const SUBMIT_BET_BATCH_FAILED = `${SLICE_BIG_AND_SMALL}/submitBetBatchFailed`

export const GET_CURRENT_BET_RESULT = `${SLICE_BIG_AND_SMALL}/getCurrentBetResult`
export const GET_CURRENT_BET_RESULT_SUCCESS = `${SLICE_BIG_AND_SMALL}/getCurrentBetResultSuccess`
export const GET_CURRENT_BET_RESULT_FAILED = `${SLICE_BIG_AND_SMALL}/getCurrentBetResultFailed`

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

export const formatPreBetData = (payload) => {
  const rawCurrentBet = payload.find(
    (data) => data.attributes.status === 'done', // trạng thái active => game đang chạy => ko phải lịch sử,
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