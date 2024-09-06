import { Col, Row } from 'antd'
import { Icon } from 'src/components/common/icons'
import { Number } from 'src/components/bigAndSmall/GameZone/elements/Number'
import { Price } from 'src/components/bigAndSmall/GameZone/elements/Price'
import { CountDown } from 'src/components/bigAndSmall/GameZone/elements/CountDown'

export const GameZone = () => {
  return (
    <Row gutter={24} className="gamezone w-[1000px] h-[300px] bg-[#1f2129] rounded-[20px] overflow-hidden mb-20">
      <Col span={12} className="gamezone__flag !pl-0 !pr-0">
        <Icon name="bigAndSmall" />
      </Col>
      <Col span={12} className="gamezone__bet p-5 flex flex-col justify-center items-center w-full !pl-[50px]">
        <div className="w-full flex justify-center gap-10">
          <Number number={6} />
          <Number number={2}/>
          <Number number={1}/>
        </div>
        <div className="w-full flex justify-center items-center mt-6 gap-10">
          <Price range="3 to 10" amount="120,000" textColor="#00FBFB" />
          <CountDown />
          <Price range="11 to 18" amount="160,000" textColor="#51EE36" />
        </div>
      </Col>
    </Row>
  )
}