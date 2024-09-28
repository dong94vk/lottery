import { Col, Row, Typography } from 'antd'
import { Icon } from 'src/components/common/icons'
import { Number } from './elements/Number'
import { CountDown } from './elements/CountDown'
import { BetValue } from './elements/BetValue'
import { BetButton } from './elements/BetButton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiGetHistory } from 'src/store/sagas/bigAndSmall'
import { formatCurrentBetData } from 'src/store/slice/bigAndSmall/type'

export const BigAndSmall = () => {
  const [currentBet, setCurrentBet] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await apiGetHistory({ code: 'TX1', page: 1, limit: 5 })
    setCurrentBet(formatCurrentBetData(res.data))
  }

  const handleChangeBet = () => {
    navigate('/big-and-small')
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
              #{currentBet?.id}
            </Typography.Text>
          </div>
          <CountDown currentBet={currentBet} />
        </div>
        <div className="flex w-3/5">
          <BetValue />
        </div>
        <div className="w-full flex justify-center items-center mt-6 gap-10">
          <BetButton
            title="small"
            joinNumber="3515"
            prize="1,200,000"
            textColor="#00FBFB"
            onClick={() => handleChangeBet('small')}
          />
          <BetButton
            title="big"
            joinNumber="3890"
            prize="1,060,000"
            textColor="#51EE37"
            onClick={() => handleChangeBet('big')}
          />
        </div>
      </Col>
    </Row>
  )
}
