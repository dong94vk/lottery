import { Col, Row } from 'antd'
import { flatMap, isEmpty, map } from 'lodash'
import { useEffect, useState } from 'react'
import useGame from 'src/store/hooks/game'
import { apiBetHistory } from 'src/store/sagas/game'
import { HistoryBigAndSmallHeader } from './constant'
import { PrizePot } from 'src/components/lottery/History/elements/PrizePot'
import { winningContent } from './helper'

export const History = () => {
  const {
    data: { histories },
  } = useGame()
  const [lastBetDone, setLatBetDone] = useState(null)

  const historyData = [
    {
      time: '23/07/2024',
      session: '55',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '54',
      winning: '1,2,3',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '53',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '52',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '51',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '50',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '49',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '48',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '47',
      winning: '4,5,6',
      yourReward: '10,000',
    },
    {
      time: '23/07/2024',
      session: '46',
      winning: '4,5,6',
      yourReward: '10,000',
    },
  ]

  useEffect(() => {
    if (!isEmpty(histories)) {
      const gameIds = map(histories, 'id')
      fetchHistoryBetData(gameIds)
    }
  }, [histories])

  const fetchHistoryBetData = async (ids) => {
    const res = await Promise.all(
      ids.map((id) => apiBetHistory({ game_id: id })),
    )
    const lastBet = flatMap(map(res, 'data'))?.find(
      (history) => history?.status === 'done',
    )
    const betHistory = histories.find(
      (bet) => +lastBet?.id === +bet?.attributes?.source,
    )
    setLatBetDone({ ...lastBet, betHistory })
  }

  return (
    <Row
      gutter={[24, 24]}
      className="w-full bg-[#1f2129] rounded-[20px] overflow-hidden p-4"
    >
      <Col span={24}>
        <table className="bg-transparent table-auto w-full">
          <thead className="border-b-2 border-[#66686C60] text-center table-header text-[16px] font-medium">
            <tr>
              {HistoryBigAndSmallHeader.map((header) => (
                <td className="pb-3" key={header.data}>
                  {header.title}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="pt-4 pb-4">
            {historyData.map((history, index) => {
              return (
                <tr
                  key={`historyBigAndSmall-${index}`}
                  className="text-center text-base font-semibold"
                >
                  <td>{history.time}</td>
                  <td>#{history.session}</td>
                  <td>{winningContent(history.winning)}</td>
                  <td>
                    <PrizePot prize={history.yourReward} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Col>
    </Row>
  )
}
