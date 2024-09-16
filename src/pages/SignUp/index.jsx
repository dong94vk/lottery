import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd'
import styled from 'styled-components'
import { Icon } from 'src/components/common/icons'
import useAuth from 'src/store/hooks/authentication'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  color: #ffffff;

  .ant-modal-content {
    background: #13151d;
    width: 600px;
    height: 360px;
  }

  ::placeholder {
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`
export const SignUpPage = (props) => {
  const { actions } = useAuth()

  const onSubmitSignUp = (values) => {
    const body = {
      email: values.email,
      password: values.password,
    }
    const onError = () => props.setOpenSignUp(false)
    actions.signUp({ body, onSuccess: getAccountInfo, onError })
  }

  const getAccountInfo = () => {
    actions.getAccountInfo({ onSuccess: () => props.setOpenSignUp(false) })
  }

  const handleClickSignIn = () => {
    props.setOpenSignUp(false)
    props.setOpenSignIn(true)
  }

  return (
    <ModalStyled
      open={props.open}
      closable={true}
      onCancel={() => props.setOpenSignUp(false)}
      footer={null}
      wrapClassName="!bg-[#00000070]"
      className="relative"
    >
      <Row gutter={24}>
        <Col span={24}>
          <Typography.Text className="text-base font-bold !text-[#7D8091]">
            REGISTER
          </Typography.Text>
        </Col>
        <Col span={15} className="mt-4">
          <Typography.Text className="text-xl font-normal !text-[#F6F4F9]">
            Join and win big prizes
          </Typography.Text>
        </Col>
        <Col span={15} className="mt-4 z-10">
          <Form onFinish={onSubmitSignUp}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'email is required',
                },
              ]}
            >
              <Input
                className="bg-[#181C28] p-4 text-white"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'password is required',
                },
                {
                  min: 8,
                  message: 'Password that must be at least 8 characters ',
                },
              ]}
            >
              <Input
                className="bg-[#181C28] p-4 text-white"
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 bg-custom-gradient text-[#F3F3F3] text-base mt-2"
            >
              Register
            </Button>
          </Form>
        </Col>
        <Col span={15} className="mt-1.5 flex justify-center z-10">
          <Typography.Text
            className="text-[#F3F3F3] text-sm font-normal cursor-pointer"
            onClick={handleClickSignIn}
          >
            Have an account? Sign in now
          </Typography.Text>
        </Col>
        <Icon name="login" className="absolute top-0 right-0" />
      </Row>
    </ModalStyled>
  )
}
