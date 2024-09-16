import { Button, Col, Row } from 'antd'
import logo from 'src/assets/icons/logo.png'

function Header(props) {
  const { handleClickSignIn, handleClickRegister } = props
  const token = localStorage.getItem('token')

  return (
    <Row
      gutter={[24, 24]}
      className="bg-[#68778B10] h-12 flex items-center justify-between"
    >
      <Col span={3} className="order-first">
        <img src={logo} alt="JPopStar" style={{ width: '150px' }} />
      </Col>
      <Col className="order-last">
        {!token && (
          <>
            <Button
              className="rounded-l-lg font-normal text-[14px]"
              onClick={handleClickSignIn}
            >
              Sign in
            </Button>
            <Button
              className="ml-3 rounded-l-lg font-normal text-[14px] bg-[#2C2C2C] text-white border-none"
              onClick={handleClickRegister}
            >
              Register
            </Button>
          </>
        )}
      </Col>
    </Row>
  )
}

export default Header
