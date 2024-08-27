import { Layout } from 'antd'
import { useEffect } from 'react'
import Header from 'src/components/layout/Header'
import useAuth from 'src/store/hooks/authentication'

const { Content } = Layout

function PrivateLayout({ children }) {
  const { actions } = useAuth()
  useEffect(() => {
    actions.getAccountInfo()
  }, [])
  return (
    <Layout className="bg-[#12151d] m-0">
      <Header />
      <Content className="flex mt-6">{children}</Content>
    </Layout>
  )
}

export default PrivateLayout
