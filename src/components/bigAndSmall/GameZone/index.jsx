import { Col, Row } from 'antd'
import { Icon } from 'src/components/common/icons'
import { Number } from 'src/components/bigAndSmall/GameZone/elements/Number'
import { Price } from 'src/components/bigAndSmall/GameZone/elements/Price'
import { CountDown } from 'src/components/bigAndSmall/GameZone/elements/CountDown'
import useAuth from 'src/store/hooks/authentication'
import useGame from 'src/store/hooks/game'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'

export const GameZone = () => {
  const { actions, data } = useGame()
  const { setting, currentBet } = data
  const { data: { account } } = useAuth()

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

  return (
    <Row gutter={24} className="gamezone w-full h-[300px] bg-[#1f2129] rounded-[20px] overflow-hidden mb-20">
      <Col span={12} className="gamezone__flag !pl-0 !pr-0">
        <Icon name="bigAndSmallFlag" />
      </Col>
      <Col span={12} className="gamezone__bet p-5 flex flex-col justify-center items-center w-full !pl-[50px]">
        <div className="w-full flex justify-center gap-10">
          <Number number={'??'} />
          <Number number={'??'}/>
          <Number number={'??'}/>
        </div>
        <div className="w-full flex justify-center items-center mt-6 gap-10">
          <Price range="3 to 10" amount="120,000" textColor="#00FBFB" />
          <CountDown />
          <Price range="11 to 18" amount="160,000" textColor="#51EE36" />
        </div>
      </Col>
    </Row>
  )
}