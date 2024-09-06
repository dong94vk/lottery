import { Row } from 'antd'
import { TicketNumber } from './elements/TicketNumber'
import dayjs from 'dayjs'
import { numberWithCommas } from '../Prize/helper'
import useLottery from 'src/store/hooks/lottery'
import { useEffect, useState } from 'react'
import { flatMap, isEmpty, map } from 'lodash'
import { apiBetHistory } from 'src/store/sagas/lottery'
import { createArrayHasQuantityElement } from '../ChooseNumber/helper'

export const History = () => {
  const { data: { histories } } = useLottery()
  const [betHistories, setHistoryData] = useState([])

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
    setHistoryData(flatMap(map(res, 'data')))
  }

  return (
    <Row className="history flex justify-center bg-[#182a3e] mt-32 rounded-3xl w-[1130px] p-3">
      <div
        className="border-solid border-2 border-[linear-gradient(161.06deg, rgba(154, 232, 255, 0) 3.06%, #9AE8FF 32%, #0A9AFC 56.47%, rgba(10, 154, 252, 0) 86.85%)] w-full rounded-3xl p-3">
        <table className="bg-transparent table-auto w-full">
          <thead>
          <tr className="table-header text-[16px] font-medium">
            <td>Time</td>
            <td>Number</td>
            <td>Prize pot</td>
            <td>Your Ticket</td>
            <td>Winning</td>
          </tr>
          </thead>
          <tbody>
          {histories?.map((history, index) => {
            const betHistory = betHistories.find((bet) => {
              return +history.id === +bet?.attributes?.source
            })?.attributes
            const betValue = betHistory?.bet_value
              ? betHistory?.bet_value?.split(',')
              : createArrayHasQuantityElement(6)
            const historyPrize = !isEmpty(history?.prize)
              ? history?.prize
              : createArrayHasQuantityElement(6)
            return (
              <tr key={index}>
                <td className="text-xl font-semibold">
                  {dayjs(history.time).format('DD/MM/YYYY')}
                </td>
                <td className="flex gap-3">
                  {historyPrize.map((numberElement, index) => {
                    return (
                      <TicketNumber
                        number={
                          history?.status === 'done' ? numberElement : '??'
                        }
                        key={index}
                        className="!text-white"
                      />
                    )
                  })}
                </td>
                <td className="text-xl font-semibold">
                  ${numberWithCommas(history.current_pot)}
                </td>
                <td className="flex gap-3">
                  {betValue.map((numberElement, index) => {
                    return (
                      <TicketNumber
                        number={
                          history?.status === 'done' && numberElement
                            ? numberElement
                            : '??'
                        }
                        key={index}
                        className={
                          history?.prize?.includes(numberElement) &&
                          history?.status === 'done'
                            ? '!text-cyan-500'
                            : '!text-white'
                        }
                      />
                    )
                  })}
                </td>
                <td className="text-xl font-semibold">
                  {betHistory?.win_amount ?? '??'}
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </Row>
  )
}
