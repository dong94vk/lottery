import { invert } from 'lodash'
import { useEffect, useState } from 'react'

export const EIP6963EventNames = {
  Announce: 'eip6963:announceProvider',
  Request: 'eip6963:requestProvider',
}

export const Currency = {
  ETH: 'ETH',
  BNB: 'BNB',
  USDT_BEP20: 'USDT_BEP20'
}

export const SupportedChainId = {
  [Currency.ETH]: 1,
  [Currency.USDT_BEP20]: 56,
  [Currency.BNB]: 204,
}

export const ChangeIdToCurrency = invert(SupportedChainId)

export const networkInfoMap = {
  [SupportedChainId.ETH]: {
    chainId: `0x${SupportedChainId.ETH.toString(16)}`,
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://eth.llamarpc.com/'],
    blockExplorerUrls: ['https://etherscan.io/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChainId.USDT_BEP20]: {
    chainId: `0x${SupportedChainId.USDT_BEP20.toString(16)}`,
    chainName: 'BNB Smart Chain Mainnet',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
}

export function isPreviouslyConnectedProvider(providerRDNS) {
  return (
    localStorage.getItem('PREVIOUSLY_CONNECTED_PROVIDER_RDNS') === providerRDNS
  )
}

export function isSupportedChain(chainId) {
  if (!chainId) return false
  return !!SupportedChainId[chainId]
}

export const useConnectWallet = () => {
  const [injectedProviders, setInjectedProviders] = useState(new Map())

  useEffect(() => {

    window.addEventListener(EIP6963EventNames.Announce, onAnnounceProvider) // Add event listener for EIP-6963 announce provider event

    window.dispatchEvent(new Event(EIP6963EventNames.Request)) // Dispatch the request for EIP-6963 provider

    return () => {
      window.removeEventListener(EIP6963EventNames.Announce, onAnnounceProvider)
      setInjectedProviders(new Map())
    }
  }, [])

  const onAnnounceProvider = (event) => {
    const { icon, rdns, uuid, name } = event.detail.info
    if (!icon || !rdns || !uuid || !name) {
      return
    }
    setInjectedProviders((prevProviders) => {
      const providers = new Map(prevProviders)
      providers.set(uuid, event.detail)
      return providers
    })
  }

  return { providers: injectedProviders }
}
