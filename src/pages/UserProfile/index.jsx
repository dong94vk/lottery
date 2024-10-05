import { Row } from 'antd'
import { PaymentHistory } from 'src/components/userProfile/PaymentHistory'
import { UserInfo } from 'src/components/userProfile/UserInfo'

export const UserProfile = () => {
  return (
    <Row className='flex flex-col gap-5'>
      <UserInfo />
      <PaymentHistory />
    </Row>
  )
}
