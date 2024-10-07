import { Col, Row } from 'antd'
import { Number } from './elements/Number'
import { CountDown } from './elements/CountDown'
import { BetValue } from './elements/BetValue'
import { BetButton } from './elements/BetButton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiGetBetJoined, apiGetHistory } from 'src/store/sagas/bigAndSmall'
import { formatCurrentBetData } from 'src/store/slice/bigAndSmall/type'
import BigOrSmallFlag from 'src/assets/images/big_or_small_flag.svg'

export const BigAndSmall = () => {
  const [currentBet, setCurrentBet] = useState(null)
  const navigate = useNavigate()
  const [betJoined, setBetJoined] = useState({ big: 0, small: 0 })

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      getBetJoined()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    const res = await apiGetHistory({ code: 'TX1', page: 1, limit: 5 })
    setCurrentBet(formatCurrentBetData(res.data))
  }

  const handleChangeBet = () => {
    navigate('/big-and-small')
  }

  const getBetJoined = async () => {
    const res = await apiGetBetJoined()
    setBetJoined({ big: res.big || 0, small: res.small || 0 })
  }

  return (
    <Row
      gutter={[24, 24]}
      className="w-full bg-[#1f2129] rounded-[20px] overflow-hidden"
    >
      <Col span={8} className="gamezone__flag !pl-0 !pr-0">
        <img src={BigOrSmallFlag} alt="big-or-small-flag" className="w-full" />
      </Col>
      <Col
        span={16}
        className="p-5 flex flex-col justify-center items-center w-full !pl-[50px] gap-5"
      >
        <div className="flex justify-around w-2/4">
          <div className="flex justify-center gap-6">
            <Number number={'?'} />
            <Number number={'?'} />
            <Number number={'?'} />
          </div>
          <CountDown currentBet={currentBet} />
        </div>
        <div className="flex w-3/5">
          <BetValue />
        </div>
        <div className="w-full flex justify-center items-center mt-6 gap-10">
          <BetButton
            title="small 3 - 10"
            joinNumber="3515"
            prize={betJoined.small || 0}
            textColor="#00FBFB"
            onClick={() => handleChangeBet('small')}
          />
          <BetButton
            title="big 11 - 18"
            joinNumber="3890"
            prize={betJoined.big || 0}
            textColor="#51EE37"
            onClick={() => handleChangeBet('big')}
          />
        </div>
      </Col>
    </Row>
  )
}
