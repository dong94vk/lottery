import { Button, Typography } from 'antd'
import { ChooseNumberElement } from './elements/ChooseNumber'
import { AddedNumber } from './elements/AddedNumber'
import { Icon } from 'src/components/common/icons/Index'
import dayjs from 'dayjs'
import useLottery from 'src/store/hooks/lottery'
import { useState } from 'react'

export const ChooseNumber = (props) => {
  const { selectedNumber } = props
  const { data } = useLottery()
  const { currentBet, setting } = data
  const [numberSelected, setNumberSelected] = useState([])
  const onChangeNumber = (index, number) => {
    numberSelected[index] = number
    setNumberSelected(numberSelected)
  }

  const onSubmit = () => {
    props.onSubmitBuyTicket(numberSelected)
  }
  return (
    <div className="choose-number flex justify-around w-full h-32 mt-12 gap-10">
      <div className="choose-number__buy-ticket flex flex-col justify-center items-center h-32">
        <div className="choose-number__buy-ticket__title flex justify-center items-center w-full">
          <Typography.Title
            level={1}
            className="!text-white !font-medium !text-4xl	"
          >
            Choose {setting.numberQuantity} Numbers
          </Typography.Title>
        </div>
        <div className="choose-number__buy-ticket__choose-number flex justify-center items-center w-full gap-4">
          {Array.from(Array(setting.numberQuantity).keys()).map((_, index) => (
            <ChooseNumberElement
              index={index}
              key={index}
              onChangeNumber={onChangeNumber}
              numberSelected={numberSelected}
            />
          ))}
        </div>
        <div className="choose-number__buy-ticket__button-submit flex justify-center items-center w-full gap-3 mt-8">
          <Button
            className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-[185px] h-[50px] text-lg font-semibold !text-white"
            onClick={onSubmit}
          >
            <Typography.Text className="text-lg font-semibold !text-white">
              BUY TICKET
            </Typography.Text>
          </Button>
        </div>
        <div className="choose-number__buy-ticket__rate flex justify-center items-center w-full gap-1 mt-2">
          <span className="text-sm font-semibold !text-white">
            1 Ticket = {setting.price || 1}
          </span>
          <Icon name="dollar" />
        </div>
      </div>
      <div className="choose-number__ticket-added flex flex-col justify-center items-center">
        <div className="choose-number__ticket-added__title flex flex-col justify-center items-center">
          <Typography.Text className="!text-white !font-medium !text-4xl">
            Draw {currentBet?.id?.toString().padStart(2, '0') || '??'}
          </Typography.Text>
          <Typography.Text className="!text-white !font-medium !text-xl">
            {dayjs(currentBet?.created_at).format('DD/MM/YYYY')}
          </Typography.Text>
        </div>
        <div className="choose-number__ticket-added__ticket-number flex flex-col justify-center items-center mt-10">
          <div className="choose-number__ticket-added__ticket-number__title">
            <Typography.Text className="!text-white !font-semibold !text-2xl mb-5">
              Ticket added
            </Typography.Text>
          </div>
          <div className="choose-number__ticket-added__ticket-number__number flex justify-center items-center mt-4 gap-3">
            {selectedNumber.map((number) => (
              <AddedNumber number={number ?? '??'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
