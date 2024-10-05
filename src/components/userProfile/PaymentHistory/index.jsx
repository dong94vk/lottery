import { Col, Row, Typography } from 'antd'
import { PaymentHistoryTable } from './elements/TablePaymentHistory'

export const PaymentHistory = () => {
  return (
    <Row
      gutter={24}
      className="user-profile-page flex items-center w-full gap-5 bg-[#1d2127] rounded-[20px] p-4"
    >
      <Col span={24}>
        <Typography.Text className="text-[#F6F4F9] text-2xl font-semibold">
          Payment history
        </Typography.Text>
      </Col>
      <Col span={24} className='mt-4'>
        <PaymentHistoryTable />
      </Col>
    </Row>
  )
}
