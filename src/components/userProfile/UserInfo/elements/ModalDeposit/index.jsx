import { Button, Modal, Select, Typography } from 'antd'
import styled from 'styled-components'
import { UserProfileInput } from '../Input'
import { useEffect, useState } from 'react'
import { apiCreatePayment } from 'src/store/sagas/authentication'
import useAuth from 'src/store/hooks/authentication'
import { DEPOSIT_UNIT_OPTIONS } from 'src/components/userProfile/UserInfo/elements/ModalDeposit/constant'
import { Currency } from 'src/store/hooks/useConnectWallet'
import { web3 } from 'src/services/web3'
import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'

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
    if(!byValue) {
      addNotification('Input deposit', NOTIFICATION_TYPE.ERROR)
      return
    }
    if (toAddress && currency === Currency.USDT_BEP20) {
      const chainIdConfig = 97
      let paramsConfig = [
        {
          chainId: `0x${Number(chainIdConfig).toString(16)}`,
          rpcUrls: ['https://bsc.blockpi.network/v1/rpc/public'],
          blockExplorerUrls: ['https://bscscan.com/'],
          chainName: 'BNB',
          nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
          },
        },
      ]
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${Number(chainIdConfig).toString(16)}` }],
        })
      } catch (e) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: paramsConfig,
        })
      }
      const w3 =  await web3();
      const contractAddressUsdt = '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684';
      const addressTransferTo = toAddress;
      const UsdtAbi = require('src/services/abi/usdt.json');
      const contractUsdt = new w3.eth.Contract(UsdtAbi,contractAddressUsdt )
      const priceWei =    w3.utils.toWei(byValue, 'ether')
      await contractUsdt.methods.transfer(addressTransferTo, priceWei).send({
        from: addressTransferTo,
      })
      const createPaymentData = {
        amount: byValue,
        currency: currency,
        ext_id: contractAddressUsdt,
      }
      await apiCreatePayment(createPaymentData)
      setOpen(false)
      authAction.getListPayment({ limit: 10, page: 1 })
    }

    if (toAddress && currency !== Currency.USDT_BEP20) {
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
