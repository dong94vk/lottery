import { Col, Modal, Row, Typography } from 'antd'
import styled from 'styled-components'
import { LotteryNumber } from './Number'
import { PrizePot } from '../../History/elements/PrizePot'
import { Icon } from 'src/components/common/icons'
import { ChoseNumberElement } from './ChooseNumber'
import { formatDataHistory } from '../helper'
import { chunk } from 'lodash'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { apiBetHistory } from 'src/store/sagas/bigAndSmall'
import useLottery from 'src/store/hooks/lottery'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  color: #ffffff;

  ::placeholder {
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`
export const HistoryTicketModal = (props) => {
  const { history } = props
  const { data } = useLottery()
  const { setting } = data
  const [betHistory, setBetHistory] = useState(null)

  useEffect(() => {
    if (history) {
      fetchHistoryBetData(history.id)
    }
  }, [history])

  const fetchHistoryBetData = async (id) => {
    const res = await apiBetHistory({ game_id: id })
    setBetHistory(formatDataHistory(res?.data, setting))
  }
  const yourTickets = chunk(betHistory?.yourTickets, 5)

  return (
    <ModalStyled
      open={props.open}
      closable={true}
      onCancel={() => props.setOpen(false)}
      footer={null}
      wrapClassName="!bg-[#00000070]"
      className="relative"
      title={
        <Typography.Text className="font-bold text-[16px] text-[#7D8091]">
          History Draw
        </Typography.Text>
      }
      width={1500}
    >
      <Row gutter={[24, 24]}>
        <Col span={24} className="flex justify-center items-center gap-3">
          {history?.prize?.map((number, index) => (
            <LotteryNumber
              number={number}
              key={index}
              className="bg-custom-gradient"
            />
          ))}
        </Col>
        <Col span={24} className="flex justify-center items-center">
          <table className="bg-transparent table-auto w-full">
            <thead className="text-center table-header text-[16px] font-medium">
              <tr>
                <td className="pb-5">Time</td>
                <td className="pb-5">Draw</td>
                <td className="pb-5">Prize pot</td>
                <td className="pb-5">First prize</td>
                <td className="pb-5">2nd prize</td>
                <td className="pb-5">3rd prize</td>
                <td className="pb-5">4th prize</td>
              </tr>
            </thead>
            <tbody className="border-b-2 border-dashed border-[#66686C60]">
              <tr className="text-center text-base font-semibold">
                <td className="pb-5">
                  {dayjs(history.time).format('DD/MM/YYYY')}
                </td>
                <td className="pb-5">#{history?.id}</td>
                <td className="pb-5">
                  {<PrizePot prize={history.current_pot} />}
                </td>
                <td className="pb-5">{history?.jackpot ?? 0} win</td>
                <td className="pb-5">{history?.secondPrize ?? 0} win</td>
                <td className="pb-5">{history?.thirdPrize ?? 0} win</td>
                <td className="pb-5">{history?.fourthPrize ?? 0} win</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span={24} className="flex justify-center items-start">
          <Col span={6}>
            <div className="flex flex-col justify-center items-center">
              <Typography.Text className="font-bold text-white">
                YOUR REWARD
              </Typography.Text>
              <Icon name="firstWinIcon" />
              <Typography.Text className="font-medium text-white text-[24px]">
                You have win
              </Typography.Text>
              <PrizePot prize={betHistory?.totalWinning ?? 0} />
            </div>
          </Col>
          <Col span={18} className="flex flex-col justify-center items-center">
            <Typography.Text className="font-bold text-white">
              YOUR TICKETS
            </Typography.Text>
            <Row
              gutter={[24, 24]}
              className="flex justify-center items-center gap-8"
            >
              {yourTickets?.map((yourTicket, index) => {
                return (
                  <Col span={10}>
                    {yourTicket?.map((ticket, ticketIndex) => {
                      return (
                        <ChoseNumberElement
                          index={index === 1 ? ticketIndex + 5 : ticketIndex}
                          numbers={ticket}
                          key={index * ticketIndex}
                          className={'!gap-3 mt-2'}
                        />
                      )
                    })}
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Col>
      </Row>
    </ModalStyled>
  )
}
