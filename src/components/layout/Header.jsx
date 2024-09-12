import { Col, Row } from 'antd'
import logo from 'src/assets/icons/logo.png'

function Header() {
  return (
    <Row gutter={[24, 0]} className="bg-[#68778B10] h-12 flex items-center">
      <Col span={3}>
        <img src={logo} alt="JPopStar" style={{ width: '150px' }} />
      </Col>
      <Col>
        
      </Col>
    </Row>
  )
}

export default Header
