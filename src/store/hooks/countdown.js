import useGame from 'src/store/hooks/game'
import { useEffect, useState } from 'react'

export const useCountDown = () => {
  const {
    actions,
    data: { currentBet },
  } = useGame()

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
      actions.getHistory({ code: 'LT6452', page: 1, limit: 6 })
      clearInterval(intervalId)
      setRemainTime({ hours: '??', minutes: '??', seconds: '??' })
    }
  }
  return remainTime
}
