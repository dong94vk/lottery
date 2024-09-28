import { Col, Row } from 'antd'
import useGame from 'src/store/hooks/bigAndSmall'
import { HistoryBigAndSmallHeader } from './constant'
import { PrizePot } from 'src/components/lottery/History/elements/PrizePot'
import { formatHistory, winningContent } from './helper'

export const History = () => {
  const {
    data: { histories },
  } = useGame()
  formatHistory(histories)

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
            {formatHistory(histories)?.map((history, index) => {
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
