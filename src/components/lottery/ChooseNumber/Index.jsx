import { Button, Col, Row, Typography } from 'antd'
import useGame from 'src/store/hooks/game'
import { useState } from 'react'
import {
  createArrayFromNumberToNumber,
  createArrayHasQuantityArrayElement,
} from 'src/components/lottery/ChooseNumber/helper'
import { LotteryNumber } from 'src/components/lottery/ChooseNumber/elements/Number'
import { ChoseNumberElement } from 'src/components/lottery/ChooseNumber/elements/ChooseNumber'
import { Icon } from 'src/components/common/icons'
import { cloneDeep, compact, concat, isEmpty, pullAt } from 'lodash'
import { MaxNumberTicket } from './constant'

export const ChooseNumber = (props) => {
  const { onSubmitBuyTicket } = props
  const { data } = useGame()
  const { setting } = data
  
  const [numberAdd, setNumberAdd] = useState([]) // dãy số đang add
  const [numberSelected, setNumberSelected] = useState(
    createArrayHasQuantityArrayElement(5, setting?.numberQuantity || 6),
  ) // dãy số đã add, mặc định 5 dãy chưa có số nào được chọn
  const onSubmit = () => {
    onSubmitBuyTicket(numberSelected)
    setNumberSelected(
      createArrayHasQuantityArrayElement(5, setting?.numberQuantity || 6),
    )
  }

  const handleDeleteSelectedNumbers = (index) => {
    const numbers = cloneDeep(numberSelected)
    pullAt(numbers, index)
    setNumberSelected(numbers)
  }

  const handleClickAddMore = () => {
    const numbersArr = cloneDeep(numberSelected)
    const remainElement = MaxNumberTicket - numbersArr.length
    let newElements = []
    if (remainElement > 0) {
      newElements = createArrayHasQuantityArrayElement(
        remainElement,
        setting.numberQuantity,
      )
    }
    const newArr = concat(numbersArr, newElements)
    setNumberSelected(newArr)
  }

  const onClickAddTicket = () => {
    if (numberAdd.length !== setting?.numberQuantity) {
      return
    }
    const newNumberSelected = cloneDeep(numberSelected)

    const indexEmpty = newNumberSelected.findIndex((numbers) =>
      isEmpty(compact(numbers)),
    )
    if (indexEmpty !== -1) {
      newNumberSelected[indexEmpty] = numberAdd
    }
    if (indexEmpty === -1 && numberSelected.length < MaxNumberTicket) {
      newNumberSelected.push(numberAdd)
    }
    setNumberSelected(newNumberSelected)
    setNumberAdd([])
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
                numberAdded={numberAdd}
                setNumberAdded={setNumberAdd}
              />
            )
          })}
        </Row>
        <Button
          className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-[185px] h-[50px] text-lg font-semibold !text-white order-last"
          onClick={onClickAddTicket}
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
              key={`numberSelected-${index}`}
              handleDelete={handleDeleteSelectedNumbers}
            />
          ))}
        </Row>
        <Row className="gap-3 flex justify-around order-3 w-full">
          <div
            className="flex justify-center items-center cursor-pointer gap-1"
            onClick={handleClickAddMore}
          >
            {numberSelected.length < MaxNumberTicket && (
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
    </Row>
  )
}
