import { Button, Modal, Select, Typography } from 'antd'
import styled from 'styled-components'
import { UserProfileInput } from '../Input'
import { useEffect, useState } from 'react'
import { apiCreatePayment } from 'src/store/sagas/authentication'
import useAuth from 'src/store/hooks/authentication'
import { DEPOSIT_UNIT_OPTIONS } from 'src/components/userProfile/UserInfo/elements/ModalDeposit/constant'
import { Currency } from 'src/store/hooks/useConnectWallet'

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

export const ModalDeposit = (props) => {
  const { open, setOpen, currency, setCurrency, provider, walletAddress } =
    props
  const { actions: authAction, data } = useAuth()
  const [byValue, setByValue] = useState(null)
  const [toAddress, setToAddress] = useState(null)
  useEffect(() => {
    setToAddress(getAddress(currency))
  }, [currency])

  const getAddress = (currency) => {
    switch (currency) {
      case Currency.ETH:
        return data?.config?.ETH_DEPOSIT_ADDRESS
      case Currency.BNB:
        return data?.config?.BNB_DEPOSIT_ADDRESS
      case Currency.USDT_BEP20:
        return data?.config?.USDT_BEP20_DEPOSIT_ADDRESS
      default:
        return data?.config?.ETH_DEPOSIT_ADDRESS
    }
  }

  const onSubmitDeposit = async () => {
    if (toAddress) {
      try {
        const transactionHash = await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              to: toAddress,
              from: walletAddress,
              value: byValue,
              data: '0x',
              gasPrice: null,
            },
          ],
        })
        const createPaymentData = {
          amount: byValue,
          currency: currency,
          ext_id: transactionHash,
        }
        await apiCreatePayment(createPaymentData)
        setOpen(false)
        authAction.getListPayment({ limit: 10, page: 1 })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('err :>> ', err)
      }
    }
  }

  const onChangeDepositUnit = (e) => {
    setCurrency(e)
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
          DEPOSIT
        </Typography.Text>
      }
    >
      <div className="flex justify-start items-center">
        <UserProfileInput
          text="Deposit"
          onChange={setByValue}
          inputClassName="mt-3 !w-2/3"
        />
        <Select
          defaultValue={['ETH']}
          onChange={onChangeDepositUnit}
          className="!bg-[#181C28] w-1/3 h-[30px]"
          options={DEPOSIT_UNIT_OPTIONS}
        />
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-2/4 h-[50px] text-lg font-semibold !text-white inline-flex justify-center mt-3"
          onClick={onSubmitDeposit}
        >
          Confirm
        </Button>
      </div>
    </ModalStyled>
  )
}
