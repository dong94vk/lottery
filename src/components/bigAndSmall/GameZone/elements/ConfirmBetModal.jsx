import { Button, Checkbox, Col, Modal, Row, Typography } from 'antd'
import styled from 'styled-components'
import { Icon } from 'src/components/common/icons'
import { isNil } from 'lodash'
import { numberWithCommas } from 'src/components/home/Prize/helper'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  color: #ffffff;

  .ant-modal-header {
    background: transparent;
  }

  .ant-modal-content {
    background: #13151d;
  }

  ::placeholder {
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`
export const ConfirmBetModal = (props) => {
  const { open, betValue, betSelected, setOpen, onClickConfirm } = props
  const onChange = (value) => {
    if (!value) {
      localStorage.setItem('isShowConfirm', '1')
    } else {
      localStorage.removeItem('isShowConfirm')
    }
  }
  return (
    <ModalStyled
      open={open}
      closable={true}
      onCancel={() => setOpen(false)}
      footer={null}
      wrapClassName="!bg-[#00000070]"
      className="relative"
      title={
        <Typography.Text className="font-bold text-[16px] text-[#7D8091]">
          Confirm
        </Typography.Text>
      }
    >
      <Row gutter={[24, 24]}>
        <Col span={24} className="flex justify-center items-center gap-1">
          <Typography.Text className="text-white text-xl font-normal">
            You want to join
          </Typography.Text>
          <Typography.Text
            className="text-xl font-normal uppercase"
            style={{ color: betSelected === 'small' ? '#00FBFB' : '#51EE37' }}
          >
            {betSelected}
          </Typography.Text>
          <Typography.Text className="text-white text-xl font-normal">
            with
          </Typography.Text>
          <Typography.Text className="text-white text-xl font-normal">
            {numberWithCommas(betValue)}
          </Typography.Text>
          <Icon name="dollar16" />
          <Typography.Text className="text-white text-xl font-normal">
            ?
          </Typography.Text>
        </Col>
        <Col span={24} className="flex justify-center items-center">
          <Button
            className="bg-custom-gradient w-[290px] h-[40px] text-white"
            onClick={() => onClickConfirm(betSelected)}
          >
            Confirm
          </Button>
        </Col>
        <Col span={24} className="flex justify-center items-center">
          <Checkbox
            onChange={(e) => onChange(!e.target.checked)}
            className="text-white"
            defaultChecked={!isNil(localStorage.getItem('isShowConfirm'))}
          >
            Don't show next time
          </Checkbox>
        </Col>
      </Row>
    </ModalStyled>
  )
}
