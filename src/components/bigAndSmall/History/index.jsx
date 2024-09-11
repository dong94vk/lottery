import { Col, Row } from 'antd'
import { Icon } from 'src/components/common/icons'
import { Number } from 'src/components/bigAndSmall/GameZone/elements/Number'
import { Price } from 'src/components/bigAndSmall/GameZone/elements/Price'
import { CountDown } from 'src/components/bigAndSmall/GameZone/elements/CountDown'
import { flatMap, isEmpty, map } from 'lodash'
import { useEffect, useState } from 'react'
import useGame from 'src/store/hooks/game'
import { apiBetHistory } from 'src/store/sagas/game'
import { createArrayHasQuantityElement } from 'src/components/lottery/ChooseNumber/helper'

export const History = () => {
  const { data: { histories } } = useGame()
  const [lastBetDone, setLatBetDone] = useState(null)

  useEffect(() => {
    if(!isEmpty(histories)) {
      const gameIds = map(histories, 'id')
      fetchHistoryBetData(gameIds)
    }
  }, [histories])

  const fetchHistoryBetData = async (ids) => {
    const res = await Promise.all(
      ids.map((id) => apiBetHistory({ game_id: id })),
    )
    const lastBet = flatMap(map(res, 'data'))?.find(history => history?.status === 'done')
    const betHistory = histories.find(bet => +lastBet?.id === +bet?.attributes?.source)
    setLatBetDone({...lastBet, betHistory})
  }

  return (
    <Row gutter={24} className="gamezone w-[1100px] h-[300px] bg-[#1f2129] rounded-[20px] overflow-hidden mb-20">
      <Col span={12} className="gamezone__flag !pl-0 !pr-0">
        <Icon name="bigAndSmallFlag" />
      </Col>
      <Col span={12} className="gamezone__bet p-5 flex flex-col justify-center items-center w-full !pl-[50px]">
        <div className="w-full flex justify-center gap-10">
          {(lastBetDone?.prize || createArrayHasQuantityElement(3))?.map((prize, index) => <Number number={prize || '??'} key={index}/>)}
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