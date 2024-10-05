import { Modal, Row, Typography } from 'antd'
import styled from 'styled-components'
import { Icon } from 'src/components/common/icons'
import { useEffect } from 'react'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  color: #ffffff;

  .ant-modal-content {
    background: #13151d;
    width: 500px;
    height: 300px;
  }

  ::placeholder {
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`
export const BuyTicketSuccessModal = (props) => {
  useEffect(() => {
    if (props.open) {
      const autoCloseModal = () => {
        props.setOpen(false)
      }
      const closeModalTimeout = setTimeout(autoCloseModal, 2000)
      return () => clearTimeout(closeModalTimeout)
    }
  }, [props.open])

  return (
    <ModalStyled
      open={props.open}
      closable={true}
      onCancel={() => props.setOpen(false)}
      footer={null}
      wrapClassName="!bg-[#00000070]"
      className="relative"
    >
      <Row gutter={[24, 24]} className="flex justify-center items-center">
        <Icon name="lotterySuccess" />
        <Typography.Text className="text-xl font-normal text-white mt-4">
          You have successfully purchased your ticket!
        </Typography.Text>
      </Row>
    </ModalStyled>
  )
}
