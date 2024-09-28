import { Typography } from 'antd'
import { CountDownNumber } from './elements/CountDown'
import { useCountDown } from 'src/store/hooks/countdown'
import useGame from 'src/store/hooks/bigAndSmall'

export const CountDown = () => {
  const {
    data: { currentBet },
  } = useGame()
  const remainTime = useCountDown({ gameCode: 'LT6452', limit: 6, currentBet })

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
