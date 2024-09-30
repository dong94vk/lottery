import { useEffect, useState } from 'react'
import useAuth from './authentication'

export const useCountDown = ({ currentBet, onCountDownEnd }) => {
  const { actions: authAction } = useAuth()

  const [remainTime, setRemainTime] = useState({})

  useEffect(() => {
    const intervalId = setInterval(
      () => calRemainTime(currentBet?.end_at, intervalId),
      1000,
    )
    return () => clearInterval(intervalId)
  }, [currentBet])

  // tính thời gian còn lại đến end_time
  const calRemainTime = (endTime, intervalId) => {
    const timeDifference = +new Date(endTime) - +new Date()
    if (timeDifference > 0) {
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
      const seconds = Math.floor((timeDifference / 1000) % 60)
      setRemainTime({ hours, minutes, seconds })
    }
    if (-1 <= timeDifference <= 0) {
      onCountDownEnd && onCountDownEnd()
      authAction.getAccountInfo()
      clearInterval(intervalId)
      setRemainTime({ hours: '??', minutes: '??', seconds: '??' })
    }
  }
  return remainTime
}
