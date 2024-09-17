import { Button, Col, Row, Typography } from 'antd'
import useGame from 'src/store/hooks/game'
import { useState } from 'react'
import { createArrayFromNumberToNumber, createArrayHasQuantityElement } from 'src/components/lottery/ChooseNumber/helper'
import { LotteryNumber } from 'src/components/lottery/ChooseNumber/elements/Number'
import { ChoseNumberElement } from 'src/components/lottery/ChooseNumber/elements/ChooseNumber'
import { Icon } from 'src/components/common/icons'
import { pullAt } from 'lodash'
import { BuyTicketSuccessModal } from './elements/BuyTicketModal'

export const ChooseNumber = (props) => {
  const { data } = useGame()
  const { setting } = data
  const [openBuyTicketModal, setOpenBuyTicketModal] = useState(false)
  const [numberSelected, setNumberSelected] = useState([
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
    [7, 8, 9, 10, 11, 12],
  ])

  const onSubmit = () => {
    setOpenBuyTicketModal(true)
    props.onSubmitBuyTicket(numberSelected)
  }

  const onClickNumber = (number, selected) => {}

  const handleDeleteSelectedNumbers = (index) => {
    const numbers = [...numberSelected]
    pullAt(numbers, index)
    setNumberSelected(numbers)
  }

  const handleClickAddMore = () => {
    if(numberSelected.length < 10) {
      const newElements = createArrayHasQuantityElement(setting?.numberQuantity)
      const numbers = [...numberSelected];
      numbers.push(newElements)
      setNumberSelected(numbers)
    }
  }
  return (
    <Row
      gutter={[24, 24]}
      className="flex items-start justify-center bg-[#1f2129] w-full rounded-[20px] p-4"
    >
      <Col
        span={12}
        className="flex flex-col items-center justify-center gap-6 "
      >
        <Typography.Text className="text-[28px] font-semibold !text-white order-first">
          Choose 6 Numbers
        </Typography.Text>
        <Row className="w-full gap-3 flex justify-center order-2">
          {createArrayFromNumberToNumber(
            setting.range.min,
            setting.range.max,
          ).map((item, index) => {
            return (
              <LotteryNumber
                number={item}
                key={index}
                handleClickNumber={onClickNumber}
              />
            )
          })}
        </Row>
        <Button
          className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-[185px] h-[50px] text-lg font-semibold !text-white order-last"
          onClick={onSubmit}
        >
          Add Ticket
        </Button>
      </Col>
      <Col
        span={11}
        className="flex flex-col items-center justify-center gap-6 border-l-2 border-dashed	border-[#66686C99]"
      >
        <Typography.Text className="text-[28px] font-semibold !text-white order-first">
          Your Tickets
        </Typography.Text>
        <Row className="flex justify-center order-2" gutter={[24, 24]}>
          {numberSelected.map((item, index) => (
            <ChoseNumberElement
              index={index}
              numbers={item}
              key={index}
              handleDelete={handleDeleteSelectedNumbers}
            />
          ))}
        </Row>
        <Row className="gap-3 flex justify-around order-3 w-full">
          <div className="flex justify-center items-center cursor-pointer gap-1" onClick={handleClickAddMore}>
            {numberSelected.length < 10 && (
              <>
                <Typography.Text className="text-[#0194FE]">
                  Add more
                </Typography.Text>
                <Icon name="plus" />
              </>
            )}
          </div>
          <div className="flex justify-center items-center gap-1">
            <Typography.Text className="text-sm font-semibold !text-white">
              1 Ticket = {setting.price || 1}
            </Typography.Text>
            <Icon name="dollar" />
          </div>
        </Row>

        <Button
          className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-[185px] h-[50px] text-lg font-semibold !text-white order-last mb-8"
          onClick={onSubmit}
        >
          Buy Ticket
        </Button>
      </Col>
      <BuyTicketSuccessModal open={openBuyTicketModal} setOpen={setOpenBuyTicketModal} />
    </Row>
  )
}
