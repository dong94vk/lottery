import { Button, Col, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BigAndSmall } from 'src/components/home/BigAndSmall'
import { Prize } from 'src/components/home/Prize'
import HomeBanner from 'src/assets/images/home_banner.svg'
import useAuth from 'src/store/hooks/authentication'

export const Home = () => {
  const { data } = useAuth()

  const navigate = useNavigate()

  const onClickBuyTicket = () => navigate('/lottery')
  const handleClickHomeBanner = () => {
    data?.config?.CLICK_HOME_BANNER
      ? navigate(data?.config?.CLICK_HOME_BANNER)
      // eslint-disable-next-line no-console
      : console.log('không có link home banner')
  }

  return (
    <Row
      gutter={24}
      className="lottery-page flex flex-col items-center justify-center w-full gap-5"
    >
      <Col span={24} className="flex w-full justify-between">
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
      <Col span={24} className="mt-28 w-full">
        <Prize />
      </Col>
      <Col span={24} className="w-full mt-4">
        <img
          src={HomeBanner}
          alt="home_banner"
          className="w-full"
          onClick={handleClickHomeBanner}
        />
      </Col>
      <Col span={24} className="flex w-full justify-between">
        <Typography.Text className="text-white text-[30px] font-semibold ">
          Other games
        </Typography.Text>
      </Col>
      <Col span={24} className="w-full flex justify-around">
        <BigAndSmall />
      </Col>
    </Row>
  )
}
