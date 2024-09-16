export const createArrayHasQuantityElement = (quantity) => {
  return Array.from(Array(quantity).keys()).map(() => null)
}

export const createArrayFromNumberToNumber = (min = 0, max = 45, step = 1) => {
  return Array.from(
    { length: (max - min) / step + 1 },
    (value, index) => min + index * step,
  )
}
