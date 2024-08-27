import { History } from 'src/components/lottery/History/Index'
import { CountDown } from 'src/components/lottery/CountDown/Index'
import { Prize } from 'src/components/lottery/Prize/Index'
import { ChooseNumber } from 'src/components/lottery/ChooseNumber/Index'
import { Row } from 'antd'
import { useEffect, useState } from 'react'
import { createArrayHasQuantityElement } from 'src/components/lottery/ChooseNumber/helper'
import useLottery from 'src/store/hooks/lottery'

export const LotteryPage = () => {
  const { actions, data } = useLottery()

  useEffect(() => {
    actions.getSetting('TX1')
    actions.getHistory({ code: 'LT6452', page: 1, limit: 10 })
  }, [])
  const { setting, currentBet } = data
  const [selectedPrize, setSelectedPrize] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(
    createArrayHasQuantityElement(6),
  )

  useEffect(() => {
    setSelectedNumber(
      createArrayHasQuantityElement(setting?.numberQuantity),
    )
  }, [setting])

  const onSubmitBuyTicket = (numberSelected) => {
    setSelectedNumber(numberSelected)
    actions.submitBet({
      account_id: 2,
      game_id: currentBet?.id,
      amount: setting?.price,
      bet_value: numberSelected.join(','),
    })
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
