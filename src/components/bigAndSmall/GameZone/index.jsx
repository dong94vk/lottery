import { Col, Row, Typography } from 'antd'
import { Icon } from 'src/components/common/icons'
import { Number } from 'src/components/bigAndSmall/GameZone/elements/Number'
import { CountDown } from 'src/components/bigAndSmall/GameZone/elements/CountDown'
import useAuth from 'src/store/hooks/authentication'
import useGame from 'src/store/hooks/game'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { BetValue } from './elements/BetValue'
import { BetButton } from './elements/BetButton'
import { useState } from 'react'
import { isNil } from 'lodash'

export const GameZone = () => {
  const { actions, data } = useGame()
  const { setting, currentBet } = data
  const {
    data: { account },
  } = useAuth()
  const [selectedBet, setSelectBet] = useState(null)
  const [selectedBetValue, setSelectBetValue] = useState(null)
  const [flagSelected, setFlagSelected] = useState(false)

  const onSubmitBuyTicket = (numberSelected) => {
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
            <Number number={'?'} />
            <Number number={'?'} />
            <Number number={'?'} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Typography.Text className="text-white font-medium text-base">
              Session
            </Typography.Text>
            <Typography.Text className="text-white font-medium text-base">
              #55
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
            prize="1,200,000"
            selected={selectedBet === 'small'}
            textColor="#00FBFB"
            onClick={() => handleChangeBet('small')}
          />
          <BetButton
            title="big"
            joinNumber="3890"
            prize="1,060,000"
            selected={selectedBet === 'big'}
            textColor="#51EE37"
            onClick={() => handleChangeBet('big')}
          />

          {/* <Price range="3 to 10" amount="120,000" textColor="#00FBFB" />
          <Price range="11 to 18" amount="160,000" textColor="#51EE36" /> */}
        </div>
      </Col>
    </Row>
  )
}
