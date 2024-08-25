import { Layout } from 'antd'
import Header from 'src/components/layout/Header'

const { Content } = Layout

function PrivateLayout({ children }) {
  return (
    <Layout className="bg-[#12151d] m-0">
      <Header />
      <Content className="flex mt-6">{children}</Content>
    </Layout>
  )
}

export default PrivateLayout
