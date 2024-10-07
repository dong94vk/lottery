import useBigAndSmall from 'src/store/hooks/bigAndSmall'
import { useCountDown } from 'src/store/hooks/countdown'
import { padStart } from 'src/utils/helper'
import { isNil } from 'lodash'

export const CountDown = () => {
  const {
    data: { currentBet },
    actions,
  } = useBigAndSmall()

  const onCountDownEnd = () => {
    actions.getHistory({ code: 'TX1', page: 1, limit: 11 })
  }

  const remainTime = useCountDown({ onCountDownEnd, currentBet })
  const renderRemainTime = (remainTime) => {
    return (
      <>
        <div className="text-4xl font-medium">
          {padStart(remainTime?.hours)}:{padStart(remainTime?.minutes)}:{padStart(remainTime?.seconds)}
        </div>
        <div className="text-[12px] font-medium">left to open</div>
      </>
    )
  }
  const renderWaitingToDraw = () => {
    return <div className="text-2xl font-medium">Waiting to draw</div>
  }
  return (
    <div className="flex flex-col justify-center items-center w-[180px]">
      {!isNil(remainTime) ? renderRemainTime(remainTime) : renderWaitingToDraw()}
    </div>
  )
}
