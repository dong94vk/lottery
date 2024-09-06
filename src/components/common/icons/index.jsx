import { ReactComponent as Dollar } from 'src/assets/icons/dollar.svg'
import { ReactComponent as Dollar16 } from 'src/assets/icons/dollar_16x16.svg'
import { ReactComponent as TopUpWallet } from 'src/assets/icons/top-up-wallet.svg'
import { ReactComponent as FirstPrize } from 'src/assets/icons/1st-prize.svg'
import { ReactComponent as SecondPrize } from 'src/assets/icons/2nd-prize.svg'
import { ReactComponent as ThirdPrize } from 'src/assets/icons/3rd-prize.svg'
import { ReactComponent as ChevronUp } from 'src/assets/icons/chevron-up.svg'
import { ReactComponent as ChevronDown } from 'src/assets/icons/chevron-down.svg'
import { ReactComponent as Login } from 'src/assets/icons/login.svg'
import { ReactComponent as BigAndSmallFlag } from 'src/assets/icons/big-and-small-flag.svg'

const icons = {
  topUpWallet: <TopUpWallet />,
  dollar: <Dollar />,
  firstPrize: <FirstPrize />,
  secondPrize: <SecondPrize />,
  thirdPrize: <ThirdPrize />,
  chevronUp: <ChevronUp />,
  chevronDown: <ChevronDown />,
  login: <Login />,
  bigAndSmall: <BigAndSmallFlag />,
  dollar16: <Dollar16 />
}

export const Icon = (props) => {
  return <span {...props}>{icons[props.name]}</span>
}
