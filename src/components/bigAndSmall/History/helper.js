import { bigNumber } from './constant'

export const winningContent = (winning) => {
  const numbers = winning.split(',')
  const total = numbers.reduce((a, b) => +a + +b, 0)
  const displayNumber = numbers.join('-')
  if (total >= bigNumber) {
    return `BIG(${displayNumber})`
  }
  return `SMALL(${displayNumber})`
}
