import { useCountDown } from 'src/store/hooks/countdown'
import useBigAndSmall from 'src/store/hooks/bigAndSmall'
import { padStart } from 'src/utils/helper'

export const CountDown = () => {
  const { data: { currentBet } } = useBigAndSmall()
  const remainTime = useCountDown({ gameCode: 'TX1', limit: 11, currentBet })
  return (
    <div className="flex flex-col justify-center items-center w-[150px]">
      <div className="text-4xl font-medium">
        {padStart(remainTime.hours)}:{padStart(remainTime.minutes)}:{padStart(remainTime.seconds)}
      </div>
      <div className="text-[12px] font-medium">left to open</div>
    </div>
  )
}
