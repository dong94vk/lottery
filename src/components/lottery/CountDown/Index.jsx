import { Typography } from 'antd'
import { CountDownNumber } from './elements/CountDown'
import { useEffect, useState } from 'react'
import useLottery from 'src/store/hooks/lottery'

export const CountDown = () => {
  const { data } = useLottery()
  const { currentBet } = data

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
    if (timeDifference <= 0) {
      // actions.getHistory({ code: 'LT6452', page: 1, limit: 30 })
      clearInterval(intervalId)
      setRemainTime({ hours: '??', minutes: '??', seconds: '??' })
    }
  }

  return (
    <div className="count-down">
      <div className="count-down__title flex justify-center items-center w-full">
        <Typography.Title
          level={1}
          className="!text-white !font-medium !text-4xl	"
        >
          Countdown to next draw
        </Typography.Title>
      </div>
      <div className="count-down__number flex justify-center w-full gap-10">
        <CountDownNumber text="H" number={remainTime.hours ?? '??'} />
        <CountDownNumber text="M" number={remainTime.minutes ?? '??'} />
        <CountDownNumber text="S" number={remainTime.seconds ?? '??'} />
      </div>
    </div>
  )
}
