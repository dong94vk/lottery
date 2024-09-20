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

export const formatDataHistory = (betHistory, setting) => {
  const yourTickets = []
  let totalWinning = 0
  betHistory.forEach((bet) => {
    const { attributes } = bet
    yourTickets.push(attributes?.bet_value?.split(','))
    totalWinning += +attributes.current_pot
  })
  const remainTicketEmpty = MaxNumberTicket - yourTickets.length
  createArrayHasQuantityElement(remainTicketEmpty).map(() =>
    yourTickets.push(createArrayHasQuantityElement(setting.numberQuantity)),
  )
  return { yourTickets, totalWinning }
}
