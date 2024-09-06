import { Layout } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import Header from 'src/components/layout/Header'
import { LoginPage } from 'src/pages/Login/Index'
import useAuth from 'src/store/hooks/authentication'

const { Content } = Layout

function PrivateLayout({ children }) {
  const { actions, data } = useAuth()
  useEffect(() => {
    if (isEmpty(data.account)) {
      actions.getAccountInfo()
    }
  }, [])
  return (<Layout className="bg-[#12151d] m-0">
      <LoginPage />
      <Header />
      <Content className="flex mt-6">{children}</Content>
    </Layout>)
}

export default PrivateLayout
