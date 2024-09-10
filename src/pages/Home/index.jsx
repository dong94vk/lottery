import { Button, Col, Row, Typography } from 'antd'
import { History } from 'src/components/bigAndSmall/History'
import { Prize } from 'src/components/lottery/Prize'

export const Home = () => {
  const onClickBuyTicket = () => {}
  return (
    <Row
      gutter={24}
      className="lottery-page flex items-center justify-center w-full"
    >
      <Col span={24} className="flex w-full justify-around">
        <Typography.Text className="text-white text-[40px] font-semibold ">
          Join Lottery Today & Win Big Prize
        </Typography.Text>
        <Button
          className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-[185px] h-[50px] text-lg font-semibold !text-white"
          onClick={onClickBuyTicket}
        >
          <Typography.Text className="text-lg font-semibold !text-white">
            BUY TICKET
          </Typography.Text>
        </Button>
      </Col>
      <Col span={24} className="mt-16">
        <Prize />
      </Col>
      <Col span={24} className="flex w-full justify-around">
        <Typography.Text className="text-white text-[40px] font-semibold ">
          Other games
        </Typography.Text>
        <Typography.Text />
      </Col>
      <Col span={24} className='w-full flex justify-around'>
        <History />
      </Col>
    </Row>
  )
}
