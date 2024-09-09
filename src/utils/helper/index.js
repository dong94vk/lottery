export const padStart = (number) => {
  if(!number) return number
  return number.toString().padStart(2, '0')
}