import { concat } from 'lodash'
import { MaxNumberTicket } from '../constant'

// tạo mảng có n phần tử
export const createArrayHasQuantityElement = (n) => {
  return Array.from(Array(n).keys()).map(() => null)
}

// tạo mảng có phần tử từ min đến max với bước nhảy step
export const createArrayFromNumberToNumber = (min = 0, max = 45, step = 1) => {
  return Array.from(
    { length: (max - min) / step + 1 },
    (value, index) => min + index * step,
  )
}

// tạo mảng bao gồm createArrayHasQuantityArrayElement mảng có numberElement phần tử
export const createArrayHasQuantityArrayElement = (
  numberArray = 5,
  numberElement = 6,
) => {
  return createArrayHasQuantityElement(numberArray).map(() =>
    createArrayHasQuantityElement(numberElement),
  )
}

export const formatDataHistory = (betHistory, setting) => {
  const tickets = []
  let totalWinning = 0
  betHistory?.forEach((bet) => {
    const { attributes } = bet
    tickets.push(attributes?.bet_value?.split(','))
    totalWinning += +attributes?.win_amount || 0
  })
  const remainTicketEmpty = MaxNumberTicket - tickets.length
  const yourTickets = concat(
    tickets,
    createArrayHasQuantityArrayElement(
      remainTicketEmpty,
      setting.numberQuantity,
    ),
  )
  return { yourTickets, totalWinning }
}
