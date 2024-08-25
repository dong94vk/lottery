import { Row } from 'antd'
import { TicketNumber } from './elements/TicketNumber'
import dayjs from 'dayjs'
import { numberWithCommas } from '../Prize/helper'
import useLottery from 'src/store/hooks/lottery'

export const History = () => {
  const { data } = useLottery()
  const { histories } = data

  return (
    <Row className="history flex justify-center bg-[#182a3e] mt-32 rounded-3xl w-[1130px] p-3">
      <div className="border-solid border-2 border-[linear-gradient(161.06deg, rgba(154, 232, 255, 0) 3.06%, #9AE8FF 32%, #0A9AFC 56.47%, rgba(10, 154, 252, 0) 86.85%)] w-full rounded-3xl p-3">
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
            {histories.map((history, index) => {
              return (
                <tr key={index}>
                  <td className="text-xl font-semibold">
                    {dayjs(history.time).format('DD/MM/YYYY')}
                  </td>
                  <td className="flex gap-3">
                    {history.prize.map((numberElement, index) => (
                      <TicketNumber
                        number={numberElement}
                        key={index}
                        className="!text-white"
                      />
                    ))}
                  </td>
                  <td className="text-xl font-semibold">
                    ${numberWithCommas(history.current_pot)}
                  </td>
                  <td className="flex gap-3">
                    {history.bet_value.map((numberElement, index) => {
                      return (
                        <TicketNumber
                          number={
                            history?.status === 'done' ? numberElement : '??'
                          }
                          key={index}
                          className={
                            history?.prize.includes(numberElement) && history?.status === 'done'
                              ? '!text-cyan-500'
                              : '!text-white'
                          }
                        />
                      )
                    })}
                  </td>
                  <td className="text-xl font-semibold">{history.amount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Row>
  )
}
