import { Layout } from 'antd'
import { isEmpty, isNil } from 'lodash'
import { useEffect, useState } from 'react'
import Header from 'src/components/layout/Header'
import { LoginPage } from 'src/pages/Login'
import { SignUpPage } from 'src/pages/SignUp'
import useAuth from 'src/store/hooks/authentication'
import Sidebar from 'src/components/layout/Sidebar'

const { Content, Sider } = Layout

function PrivateLayout({ children }) {
  const { actions, data } = useAuth()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (isEmpty(data.account)) {
      actions.getAccountInfo()
    }
  }, [])
  const [openRegister, setOpenRegister] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(isNil(token))

  return (
    <>
      <Header
        handleClickSignIn={() => setOpenSignIn(true)}
        handleClickRegister={() => setOpenRegister(true)}
      />
      <Layout className="bg-[#12151d] pr-[10px] pl-[10px] pt-6">
        <Sider
          width={76}
          className="!bg-[#363940] h-[calc(100vh-105px)] !border !border-solid !border-[#757575] !rounded-[20px] overflow-hidden"
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
        <Sider
          width={250}
          className="!bg-[#050609] h-[calc(100vh-105px)] !border !border-solid !border-[#757575] !rounded-[20px] overflow-hidden"
        ></Sider>
      </Layout>
    </>
  )
}

export default PrivateLayout
