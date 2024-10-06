import { Col, Row } from 'antd'
import useBigAndSmall from 'src/store/hooks/bigAndSmall'
import { HistoryBigAndSmallHeader } from './constant'
import { PrizePot } from 'src/components/lottery/History/elements/PrizePot'
import { formatHistory, winningContent } from '../helper'
import { useEffect, useState } from 'react'
import { apiBetHistory } from 'src/store/sagas/bigAndSmall'
import { flatMap, isEmpty } from 'lodash'

export const History = () => {
  const {
    data: { histories },
  } = useBigAndSmall()

  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    fetchHistoryBetData()
  }, [histories])

  const fetchHistoryBetData = async () => {
    const res = await Promise.all(
      histories?.map((history) => {
        return apiBetHistory({ game_id: history.id })
      }),
    )
    const betHistories = flatMap(
      res?.map((bet) => {
        return flatMap(bet?.data)
      }),
    )

    const historiesData = []
    histories.forEach((history) => {
      const betHistory = betHistories?.filter((bet) => {
        return bet?.attributes?.source === history?.id
      })
      if (!isEmpty(betHistory)) {
        betHistory?.forEach((betH) => {
          historiesData.push({
            ...history,
            ...betH,
            id: betH?.attributes?.source,
          })
        })
      } else {
        historiesData.push(history)
      }
    })
    setHistoryData(historiesData)
  }

  const renderYourPick = (yourPick) => {
    if (yourPick === 'NON-PICK') return yourPick
    if (!isEmpty(yourPick.split('_'))) {
      return (
        <span className="flex items-center justify-center gap-3">
          {yourPick.split('_')[0]}{' '}
          <PrizePot prize={`${yourPick.split('_')[1]}`} />{' '}
        </span>
      )
    }
    return '?'
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
            {formatHistory(historyData)?.map((history, index) => {
              return (
                <tr
                  key={`historyBigAndSmall-${index}`}
                  className="text-center text-base font-semibold"
                >
                  <td>{history.time}</td>
                  <td>#{history.session}</td>
                  <td>{winningContent(history.winning)}</td>
                  <td>{renderYourPick(history.yourPick)}</td>
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
