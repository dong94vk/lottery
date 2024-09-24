import { useCountDown } from 'src/store/hooks/countdown'
import { padStart } from 'src/utils/helper'

export const CountDown = () => {
  const remainTime = useCountDown({ gameCode: 'TX1', limit: 11 })
  return (
    <div className="flex flex-col justify-center items-center w-[150px]">
      <div className="text-4xl font-medium">
        {padStart(remainTime.hours)}:{padStart(remainTime.minutes)}:{padStart(remainTime.seconds)}
      </div>
      <div className="text-[12px] font-medium">left to open</div>
    </div>
  )
}
