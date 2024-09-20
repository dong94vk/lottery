import { Col, Row } from 'antd'
import { TicketNumber } from './elements/TicketNumber'
import dayjs from 'dayjs'
import useGame from 'src/store/hooks/game'
import { isEmpty } from 'lodash'
import { createArrayHasQuantityElement } from '../ChooseNumber/helper'
import { CountDown } from '../CountDown'
import { PrizePot } from './elements/PrizePot'
import { NumberTicket } from './elements/NumberTicket'

export const History = () => {
  const {
    data: { histories },
  } = useGame()

  return (
    <Row
      gutter={[24, 24]}
      className="flex items-start justify-center bg-[#1f2129] w-full rounded-[20px] p-8 mt-10"
    >
      <Col span={24}>
        <CountDown />
      </Col>
      <Col span={24} className="flex justify-center mt-10">
        <table className="bg-transparent table-auto w-3/4">
          <thead className="border-b-2 border-[#66686C60] text-center table-header text-[16px] font-medium">
            <tr>
              <td className="pb-5">Time</td>
              <td className="pb-5">Draw</td>
              <td className="pb-5">Winning</td>
              <td className="pb-5">Prize pot</td>
              <td className="pb-5">Your tickets</td>
            </tr>
          </thead>
          <tbody>
            {histories?.map((history, index) => {
              const historyPrize = !isEmpty(history?.prize) // số trúng giải
                ? history?.prize
                : createArrayHasQuantityElement(6)

              return (
                <tr key={index} className="text-center text-base font-semibold">
                  <td>{dayjs(history.time).format('DD/MM/YYYY')}</td>
                  <td>#{history.id}</td>
                  <td className="flex gap-3 justify-center py-2">
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
                  <td>
                    <PrizePot prize={history.current_pot} />
                  </td>
                  <td>
                    <NumberTicket
                      numberTicket={history?.ticket_count ?? '??'}
                      ticketId={history.id}
                      history={history}
                    />
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
