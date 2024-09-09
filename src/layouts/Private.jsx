import { Layout } from 'antd'
import { isEmpty, isNil } from 'lodash'
import { useEffect, useState } from 'react'
import Header from 'src/components/layout/Header'
import { LoginPage } from 'src/pages/Login'
import { SignUpPage } from 'src/pages/SignUp'
import useAuth from 'src/store/hooks/authentication'

const { Content } = Layout

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
    <Layout className="bg-[#12151d] m-0">
      <LoginPage setOpenSignUp={setOpenRegister} open={openSignIn} setOpenSignIn={setOpenSignIn} />
      <SignUpPage open={openRegister} setOpenSignUp={setOpenRegister} setOpenSignIn={setOpenSignIn} />
      <Header />
      <Content className="flex mt-6">{children}</Content>
    </Layout>
  )
}

export default PrivateLayout
