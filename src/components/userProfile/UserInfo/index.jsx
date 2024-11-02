import { Button, Col, Row, Typography } from 'antd'
import { useState } from 'react'
import { Icon } from 'src/components/common/icons'
import { numberWithCommas } from 'src/components/home/Prize/helper'
import { UserProfileInput } from 'src/components/userProfile/UserInfo/elements/Input'
import { ModalDeposit } from 'src/components/userProfile/UserInfo/elements/ModalDeposit'
import { ModalWithdraw } from 'src/components/userProfile/UserInfo/elements/ModalWithDraw'
import useAuth from 'src/store/hooks/authentication'
import { ModalSelectWallet } from './elements/ModalSelectWallet'

export const UserInfo = () => {
  const username = localStorage.getItem('username')
  const email = localStorage.getItem('email')
  const [walletAddress, setWalletAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [currency, setCurrency] = useState('ETH')
  const [openModalSelectWallet, setOpenModalSelectWallet] = useState(false)

  const [openDeposit, setOpenDeposit] = useState(false)
  const [openWithdraw, setOpenWithdraw] = useState(false)

  const { data } = useAuth()

  const onClickConnectWallet = async () => {
    setOpenModalSelectWallet(true)
  }

  const handleClickDeposit = async () => {
    if (!walletAddress) setOpenModalSelectWallet(true)
    setOpenDeposit(true)
  }

  const onClickWithdraw = () => {
    setOpenWithdraw(true)
  }

  return (
    <Row
      gutter={24}
      className="user-profile-page flex items-center w-full gap-5 bg-[#1d2127] rounded-[20px] p-4"
    >
      <Col span={11} className="flex flex-col gap-5">
        <Typography.Text className="text-white text-2xl font-semibold">
          Account
        </Typography.Text>
        <UserProfileInput text="Email" value={email} disabled />
        <UserProfileInput text="Username" value={username} disabled />
        <UserProfileInput
          text="Password"
          value={'********'}
          disabled
          type="password"
        />
      </Col>
      <Col
        span={11}
        className="border-l-2 border-dashed	border-[#66686C99] flex flex-col gap-5 !pl-14"
      >
        <Typography.Text className="text-white text-2xl font-semibold">
          Wallet
        </Typography.Text>
        <UserProfileInput
          text="Balance"
          value={numberWithCommas(data?.account?.attributes?.balance)}
          disabled
          prefix={<Icon name="dollar" />}
          suffix={
            <Typography.Text
              className="text-[#0194FE] font-normal text-sm cursor-pointer"
              onClick={() => handleClickDeposit()}
            >
              Add
            </Typography.Text>
          }
        />

        <UserProfileInput
          text="Wallet"
          value={walletAddress}
          placeholder="You have not connect any wallet"
          disabled
        />
        <div className="flex justify-center">
          {!walletAddress ? (
            <Button
              className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-2/4 h-[50px] text-lg font-semibold !text-white inline-flex justify-center"
              onClick={onClickConnectWallet}
            >
              Connect wallet
            </Button>
          ) : (
            <Button
              className="bg-custom-gradient rounded-xl p-[12px_46px_12px_46px] w-2/4 h-[50px] text-lg font-semibold !text-white inline-flex justify-center"
              onClick={onClickWithdraw}
            >
              Withdraw
            </Button>
          )}
        </div>
        <Typography.Text className="!text-[#F3F3F3] w-full inline-flex justify-center">
          {!walletAddress ? '' : 'Payment history'}
        </Typography.Text>
      </Col>
      <ModalDeposit
        open={openDeposit}
        setOpen={setOpenDeposit}
        walletAddress={walletAddress}
        currency={currency}
        setCurrency={setCurrency}
        provider={provider}
      />
      <ModalWithdraw
        open={openWithdraw}
        setOpen={setOpenWithdraw}
        walletAddress={walletAddress}
      />
      <ModalSelectWallet
        open={openModalSelectWallet}
        setOpen={setOpenModalSelectWallet}
        setConnectedAccount={setWalletAddress}
        setCurrency={setCurrency}
        setProvider={setProvider}
      />
    </Row>
  )
}
