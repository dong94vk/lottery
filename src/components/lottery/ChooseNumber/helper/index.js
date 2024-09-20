import { concat } from 'lodash'
import { MaxNumberTicket } from '../constant'

export const createArrayHasQuantityElement = (quantity) => {
  return Array.from(Array(quantity).keys()).map(() => null)
}

export const createArrayFromNumberToNumber = (min = 0, max = 45, step = 1) => {
  return Array.from(
    { length: (max - min) / step + 1 },
    (value, index) => min + index * step,
  )
}

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
  betHistory.forEach((bet) => {
    const { attributes } = bet
    tickets.push(attributes?.bet_value?.split(','))
    totalWinning += +attributes.current_pot
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
