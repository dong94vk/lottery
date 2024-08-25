export const createArrayHasQuantityElement = (quantity) => {
  return Array.from(Array(quantity).keys()).map(() => null)
}
