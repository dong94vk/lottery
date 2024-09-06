import { History } from 'src/components/lottery/History/Index'
import { CountDown } from 'src/components/lottery/CountDown/Index'
import { Prize } from 'src/components/lottery/Prize/Index'
import { ChooseNumber } from 'src/components/lottery/ChooseNumber/Index'
import { Row } from 'antd'
import { useEffect, useState } from 'react'
import { createArrayHasQuantityElement } from 'src/components/lottery/ChooseNumber/helper'
import useLottery from 'src/store/hooks/lottery'
import useAuth from 'src/store/hooks/authentication'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'

export const LotteryPage = () => {
  const { actions, data } = useLottery()
  const { setting, currentBet } = data
  const { data: { account } } = useAuth()

  useEffect(() => {
    actions.getSetting('LT6452')
    actions.getHistory({ code: 'LT6452', page: 1, limit: 30 })
  }, [])

  const [selectedPrize, setSelectedPrize] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(createArrayHasQuantityElement(6))

  useEffect(() => {
    setSelectedNumber(createArrayHasQuantityElement(setting?.numberQuantity))
  }, [setting])

  const onSubmitBuyTicket = (numberSelected) => {
    setSelectedNumber(numberSelected)
    if (+account?.attributes?.balance > +setting?.price) {
      return actions.submitBet({
        account_id: +account.id,
        game_id: +currentBet?.id,
        amount: +setting?.price,
        bet_value: numberSelected.join(','),
      })
    }

    return addNotification('Not enough amount!', NOTIFICATION_TYPE.ERROR)
  }

  return (
    <Row className="lottery-page flex flex-col items-center justify-center w-full">
      <CountDown />
      <Prize setSelectedPrize={setSelectedPrize} />
      <ChooseNumber
        onSubmitBuyTicket={onSubmitBuyTicket}
        selectedNumber={selectedNumber}
        selectedPrize={selectedPrize}
      />
      <History />
    </Row>
  )
}
