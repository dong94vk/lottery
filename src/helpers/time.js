export const getDuration = (minutes) => {
  const date = new Date(0)
  date.setSeconds(minutes)
  return date.toISOString().substring(11, 19)
}
