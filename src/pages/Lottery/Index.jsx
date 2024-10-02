import { History } from 'src/components/lottery/History'
import { Prize } from 'src/components/lottery/Prize'
import { ChooseNumber } from 'src/components/lottery/ChooseNumber'
import { Row } from 'antd'
import { useEffect, useState } from 'react'
import useAuth from 'src/store/hooks/authentication'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { BuyTicketSuccessModal } from 'src/components/lottery/ChooseNumber/elements/BuyTicketModal'
import { compact, isEmpty } from 'lodash'
import useLottery from 'src/store/hooks/lottery'

export const LotteryPage = () => {
  const { actions, data } = useLottery()
  const { actions: authAction } = useAuth()
  
  const { setting, currentBet } = data
  const {
    data: { account },
  } = useAuth()

  useEffect(() => {
    actions.getSetting('LT6452')
    actions.getHistory({
      code: 'LT6452',
      page: 1,
      limit: 6,
      user_id: account?.id,
    })
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
    return actions.submitBetBatch({
      body: {
        account_id: +account.id,
        game_id: +currentBet?.id,
        amount,
        bet_value: numbersArr.map((numbers) => numbers?.join(',')),
      },
      onSuccess: () => {
        setOpenBuyTicketModal(true)
        authAction.getAccountInfo()
      }, // show popup thông báo mua ticket thành công
      onFailed: () =>
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
