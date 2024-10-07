import { Layout } from 'antd'
import { isEmpty, isNil } from 'lodash'
import { useEffect, useState } from 'react'
import Header from 'src/components/layout/Header'
import { LoginPage } from 'src/pages/Login'
import { SignUpPage } from 'src/pages/SignUp'
import useAuth from 'src/store/hooks/authentication'
import Sidebar from 'src/components/layout/Sidebar'
import LotteryBanner from 'src/assets/images/lottery_banner.svg'
import BigOrSmallBanner from 'src/assets/images/big_or_small_banner.svg'
import { useNavigate } from 'react-router-dom'

const { Content, Sider } = Layout

function PrivateLayout({ children }) {
  const { actions, data } = useAuth()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    actions.getConfig()
    if (isEmpty(data.account)) {
      actions.getAccountInfo()
    }
  }, [])
  const [openRegister, setOpenRegister] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(isNil(token))
  const onClickLotteryBanner = () => {
    data?.config?.CLICK_LOTTERY_BANNER
      ? navigate(data?.config?.CLICK_LOTTERY_BANNER)
      // eslint-disable-next-line no-console
      : console.log('không có link lottery banner')
  }

  const onClickBigOrSmallBanner = () => {
    data?.config?.CLICK_BIG_OR_SMALL_BANNER
      ? navigate(data?.config?.CLICK_BIG_OR_SMALL_BANNER)
      // eslint-disable-next-line no-console
      : console.log('không có link big or small banner')
  }

  return (
    <>
      <Header
        handleClickSignIn={() => setOpenSignIn(true)}
        handleClickRegister={() => setOpenRegister(true)}
      />
      <Layout className="bg-[#12151d] pr-[10px] pl-[10px] pt-6">
        <Sider
          width={76}
          className="!bg-[#363940] h-[calc(100vh-100px)] !border !border-solid !border-[#757575] !rounded-[20px] overflow-hidden relative"
        >
          <Sidebar />
        </Sider>
        <Content className="pl-12 pr-12">{children}</Content>
        <LoginPage
          setOpenSignUp={setOpenRegister}
          open={openSignIn}
          setOpenSignIn={setOpenSignIn}
        />
        <SignUpPage
          open={openRegister}
          setOpenSignUp={setOpenRegister}
          setOpenSignIn={setOpenSignIn}
        />
        <Sider width={221} className="overflow-hidden">
          <img
            src={LotteryBanner}
            className="w-full h-[430px]"
            alt="lottery_banner"
            onClick={onClickLotteryBanner}
          />
          <img
            src={BigOrSmallBanner}
            className="w-full h-[430px] mt-3"
            alt="lottery_banner"
            onClick={onClickBigOrSmallBanner}
          />
        </Sider>
      </Layout>
    </>
  )
}

export default PrivateLayout
