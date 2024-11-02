import { Button, Modal, Row, Typography } from 'antd'
import styled from 'styled-components'
import { map } from 'lodash'
import { ChangeIdToCurrency, useConnectWallet } from 'src/store/hooks/useConnectWallet'

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

export const ModalSelectWallet = (props) => {
  const { providers } = useConnectWallet()

  const { open, setOpen, setConnectedAccount, setCurrency, setProvider } = props
  const providerArr = map(
    Array.from(providers, ([name, value]) => ({ name, value })),
    'value',
  )

  async function handleConnectProvider(selectedProviderDetails) {
    const { provider } = selectedProviderDetails
    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      })
      setConnectedAccount(accounts[0])
      setProvider(provider)
      setOpen(false)
      const chainId = await provider.request({ method: 'eth_chainId' })
      const currency = ChangeIdToCurrency[Number(chainId)]
      setCurrency(currency)
    } catch (error) {
      throw new Error('Failed to connect to provider')
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
        <Typography.Text className="uppercase text-[#7D8091] font-bold text-[16px]">
          Select Wallet
        </Typography.Text>
      }
    >
      <Row className="flex justify-center items-center">
        Choose wallet
        {providerArr.map((provider) => (
          <Button
            key={provider.info.uuid}
            onClick={() => handleConnectProvider(provider)}
            className="w-full h-full flex justify-center items-center gap-3 bg-custom-gradient mb-3"
          >
            <img src={provider.info.icon} alt={provider.info.name} width={30} />
            <div>{provider.info.name}</div>
          </Button>
        ))}
      </Row>
    </ModalStyled>
  )
}
