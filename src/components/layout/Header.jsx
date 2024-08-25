import { Col, Row, Typography } from 'antd'

function Header() {
  return (
    <Row gutter={[24, 0]} className="bg-[#68778B10] h-12 flex items-center">
      <Col span={3} offset={1}>
        <Typography.Title level={1} className="!text-white !mb-0">
          LOGO
        </Typography.Title>
      </Col>
    </Row>
  )
}

export default Header
