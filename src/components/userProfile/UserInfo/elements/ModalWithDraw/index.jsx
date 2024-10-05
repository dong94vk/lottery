import { Button, Modal, Typography } from 'antd'
import styled from 'styled-components'
import { UserProfileInput } from '../Input'
import { Icon } from 'src/components/common/icons'
import { useState } from 'react'
import { apiCreatePayout } from 'src/store/sagas/authentication'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  color: #ffffff;
  .ant-modal-header {
    background: transparent;
  }
  .ant-modal-content {
    background: #13151d;
    width: 550px;
    height: 250px;
  }

  ::placeholder {
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`

export const ModalWithdraw = (props) => {
  const { open, setOpen, walletAddress } = props

  const [amountValue, setAmountValue] = useState(null)
  const onSubmit = async () => {
    const createPayoutData = {
      amount: +amountValue,
      address: walletAddress,
    }

    await apiCreatePayout(createPayoutData)
    setOpen(false)
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
        <Typography.Text className="uppercase text-[#7D8091] font-bold text-[16px]">
          WITHDRAW
        </Typography.Text>
      }
    >
      <UserProfileInput
        text="Amount"
        suffix={<Icon name="dollar" />}
        onChange={setAmountValue}
      />
      <UserProfileInput
        text="To Wallet"
        value={walletAddress}
        inputClassName="mt-3"
        disabled
      />
      <div className="flex justify-center">
        <Button
          className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-2/4 h-[50px] text-lg font-semibold !text-white inline-flex justify-center mt-3"
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </div>
    </ModalStyled>
  )
}
