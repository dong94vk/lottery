import { History } from 'src/components/lottery/History'
import { Prize } from 'src/components/lottery/Prize'
import { ChooseNumber } from 'src/components/lottery/ChooseNumber'
import { Row } from 'antd'
import { useEffect, useState } from 'react'
import useGame from 'src/store/hooks/game'
import useAuth from 'src/store/hooks/authentication'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { BuyTicketSuccessModal } from 'src/components/lottery/ChooseNumber/elements/BuyTicketModal'
import { compact, isEmpty } from 'lodash'

export const LotteryPage = () => {
  const { actions, data } = useGame()
  const { setting, currentBet } = data
  const {
    data: { account },
  } = useAuth()

  useEffect(() => {
    actions.getSetting('LT6452')
    actions.getHistory({ code: 'LT6452', page: 1, limit: 5 })
  }, [])

  const [selectedPrize, setSelectedPrize] = useState(null)
  const [openBuyTicketModal, setOpenBuyTicketModal] = useState(false)

  const onSubmitBuyTicket = (numberSelected) => {
    const numbersArr = numberSelected.filter(
      (numbers) => !isEmpty(compact(numbers)),
    ) // các dãy só được chọn
    const numberTicket = numbersArr.length
    const amount = +setting?.price * numberTicket // số tiền cần trả
    if (numberTicket <= 0) {
      return
    }
    if (+account?.attributes?.balance < amount) {
      return addNotification('Not enough amount!', NOTIFICATION_TYPE.ERROR) // thông báo ko đủ tiền bet
    }
    return actions.submitBet({
      body: {
        account_id: +account.id,
        game_id: +currentBet?.id,
        amount,
        bet_value: numbersArr.map((numbers) => numbers.join(',')),
      },
      onSuccess: () => setOpenBuyTicketModal(true), // show popup thông báo mua ticket thành công
      onFail: () =>
        addNotification('Something went wrong!', NOTIFICATION_TYPE.ERROR),
    })
  }

  return (
    <Row className="lottery-page flex flex-col items-center justify-center w-full">
      <Prize setSelectedPrize={setSelectedPrize} />
      <ChooseNumber
        onSubmitBuyTicket={onSubmitBuyTicket}
        selectedPrize={selectedPrize}
      />
      <History />
      <BuyTicketSuccessModal
        open={openBuyTicketModal}
        setOpen={setOpenBuyTicketModal}
      />
    </Row>
  )
}
