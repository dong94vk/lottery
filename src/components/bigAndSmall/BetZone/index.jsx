import { Col, Row, Typography } from 'antd'
import { Icon } from 'src/components/common/icons'
import { Number } from 'src/components/bigAndSmall/BetZone/elements/Number'
import { CountDown } from 'src/components/bigAndSmall/BetZone/elements/CountDown'
import useAuth from 'src/store/hooks/authentication'
import useBigAndSmall from 'src/store/hooks/bigAndSmall'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { BetValue } from './elements/BetValue'
import { BetButton } from './elements/BetButton'
import { useEffect, useState } from 'react'
import { ConfirmBetModal } from './elements/ConfirmBetModal'
import { createArrayHasQuantityArrayElement } from 'src/components/lottery/ChooseNumber/helper'
import { isNil } from 'lodash'
import { apiGetBetJoined } from 'src/store/sagas/bigAndSmall'
import { BET_VALUE } from './constant'

export const GameZone = () => {
  const { actions, data } = useBigAndSmall()
  const { setting, currentBet, preBet } = data
  const [betJoined, setBetJoined] = useState({ big: 0, small: 0 })
  const {
    actions: authAction,
    data: { account },
  } = useAuth()

  const [selectedBet, setSelectBet] = useState(null) // bet big/small
  const [selectedBetValue, setSelectBetValue] = useState(null) // tiền bet
  const [flagSelected, setFlagSelected] = useState(false) // cờ active bet
  const [openConfirmModal, setOpenConfirmModal] = useState(false) // open confirm modal

  useEffect(() => {
    const interval = setInterval(() => {
      getBetJoined()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getBetJoined = async () => {
    const res = await apiGetBetJoined()
    setBetJoined({ big: res.big || 0, small: res.small || 0 })
  }

  const onSubmitBuyTicket = (bet) => {
    if (+account?.attributes?.balance > +setting?.price) {
      return actions.submitBet({
        body: {
          account_id: +account.id,
          game_id: +currentBet?.id,
          amount: +selectedBetValue,
          bet_value: bet === 'small' ? BET_VALUE.SMALL : BET_VALUE.BIG,
        },
        onSuccess: () => {
          setSelectBet(null)
          setOpenConfirmModal(false)
          authAction.getAccountInfo()
          actions.getHistory({ code: 'TX1', page: 1, limit: 11 })
        },
        onFailed: () => {
          setSelectBet(null)
          setOpenConfirmModal(false)
          actions.getHistory({ code: 'TX1', page: 1, limit: 11 })
        },
      })
    }
    setOpenConfirmModal(false)
    return addNotification('Not enough amount!', NOTIFICATION_TYPE.ERROR)
  }

  const handleChangeBetValue = (betValue) => {
    setSelectBetValue(betValue)
  }

  const handleChangeBet = (bet) => {
    if (isNil(selectedBetValue) || +selectedBetValue === 0) {
      setFlagSelected(true)
      setSelectBet(null)
      return
    }
    setSelectBet(bet)
    if (isNil(localStorage.getItem('isShowConfirm'))) {
      setOpenConfirmModal(true)
    } else {
      onSubmitBuyTicket(bet)
    }
  }

  return (
    <Row
      gutter={[24, 24]}
      className="w-full bg-[#1f2129] rounded-[20px] overflow-hidden"
    >
      <Col span={8} className="gamezone__flag !pl-0 !pr-0">
        <Icon name="bigAndSmallFlag" />
      </Col>
      <Col
        span={16}
        className="p-5 flex flex-col justify-center items-center w-full !pl-[50px] gap-5"
      >
        <div className="flex justify-between w-3/5">
          <div className="flex justify-center gap-6">
            {isNil(currentBet) &&
              preBet?.prize?.map((win_number) => (
                <Number number={win_number || '?'} />
              ))}
            {!isNil(currentBet) &&
              createArrayHasQuantityArrayElement(3).map(() => (
                <Number number={'?'} />
              ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <Typography.Text className="text-white font-medium text-base">
              Session
            </Typography.Text>
            <Typography.Text className="text-white font-medium text-base">
              #{currentBet?.id}
            </Typography.Text>
          </div>
          <CountDown />
        </div>
        <div className="flex w-3/5">
          <BetValue
            onChange={handleChangeBetValue}
            flag={flagSelected}
            setFlag={setFlagSelected}
          />
        </div>
        <div className="w-full flex justify-center items-center mt-6 gap-10">
          <BetButton
            title="small"
            joinNumber="3515"
            prize={betJoined.small}
            selected={selectedBet === 'small'}
            textColor="#00FBFB"
            onClick={() => handleChangeBet('small')}
          />
          <BetButton
            title="big"
            joinNumber="3890"
            prize={betJoined.big}
            selected={selectedBet === 'big'}
            textColor="#51EE37"
            onClick={() => handleChangeBet('big')}
          />
        </div>
      </Col>
      <ConfirmBetModal
        open={openConfirmModal}
        betValue={selectedBetValue}
        betSelected={selectedBet}
        setOpen={setOpenConfirmModal}
        onClickConfirm={onSubmitBuyTicket}
      />
    </Row>
  )
}
