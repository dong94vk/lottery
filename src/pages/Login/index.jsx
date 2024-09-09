import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd'
import styled from 'styled-components'
import { Icon } from 'src/components/common/icons'
import useAuth from 'src/store/hooks/authentication'
import { useEffect, useState } from 'react'
import { isNil } from 'lodash'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  color: #ffffff;

  .ant-modal-content {
    background: #13151D;
    width: 600px;
    height: 360px;
  }

  ::placeholder {
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`
export const LoginPage = () => {
  const token = localStorage.getItem('token')
  const { actions } = useAuth()
  const [open, setOpen] = useState(isNil(token))

  useEffect(() => {
    const listenerRemoveToken = () => {
      setOpen(true)
    }
    window.addEventListener('removeToken', listenerRemoveToken)
    return () => window.removeEventListener('removeToken',listenerRemoveToken)
  }, [])

  const onSubmitLogin = (values) => {
    const body = {
      email: values.username,
      password: values.password,
    }
    const onError = () => setOpen(false)
    actions.login({ body, onSuccess: getAccountInfo, onError })
  }

  const getAccountInfo = () => {
    actions.getAccountInfo({ onSuccess: () => setOpen(false) })
  }

  return (
    <ModalStyled open={open} closable={true} onCancel={() => setOpen(false)} footer={null} wrapClassName="!bg-[#00000070]" className="relative">
      <Row gutter={24}>
        <Col span={24}>
          <Typography.Text className="text-base font-bold !text-[#7D8091]">
            SIGN IN
          </Typography.Text>
        </Col>
        <Col span={15} className="mt-4">
          <Typography.Text className="text-xl font-normal !text-[#F6F4F9]">
            Join and win big prizes
          </Typography.Text>
        </Col>
        <Col span={15} className="mt-4 z-10">
          <Form onFinish={onSubmitLogin}>
            <Form.Item name="username" rules={[{
              required: true,
              message: 'username is required',
            }]}>
              <Input className="bg-[#181C28] p-4 text-white" placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{
              required: true,
              message: 'password is required',
            }, {
              min: 8,
              message: 'Password that must be at least 8 characters ',
            }]}>
              <Input className="bg-[#181C28] p-4 text-white" placeholder="Password" type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-10 bg-custom-gradient text-[#F3F3F3] text-base mt-2">
              Sign in
            </Button>
          </Form>
        </Col>
        <Col span={15} className="mt-1.5 flex justify-center">
          <Typography.Text className="text-[#F3F3F3] text-sm font-normal">
            Don’t have account? Register now
          </Typography.Text>
        </Col>
        <Icon name="login" className="absolute top-0 right-0" />
      </Row>
    </ModalStyled>
  )
}
