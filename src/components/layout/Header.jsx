import { Button, Col, Divider, Row } from 'antd'
import logo from 'src/assets/icons/logo.png'
import { Icon } from '../common/icons'
import useAuth from 'src/store/hooks/authentication'
import { numberWithCommas } from '../home/Prize/helper'

function Header(props) {
  const { handleClickSignIn, handleClickRegister } = props
  const token = localStorage.getItem('token')
  const { data } = useAuth()

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
        {token && (
          <>
            <div className="flex justify-center items-center">
              <span className="flex justify-center items-center gap-1 shadow-[inset_0_0_4px_0_#FFFFFF40] p-1 pl-2 pr-2 rounded-lg">
                <Icon name="dollar" />
                {numberWithCommas(data?.account?.attributes?.balance)}
                <Divider type="vertical" style={{  borderColor: '#fff' }}/>
                <Icon name="topUpWallet" />
              </span>
              <span>{data?.account?.attributes?.username}</span>
            </div>
          </>
        )}
      </Col>
    </Row>
  )
}

export default Header
