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
import { ReactComponent as Lottery } from 'src/assets/icons/lottery.svg'
import { ReactComponent as BigAndSmall } from 'src/assets/icons/big-and-small.svg'
import { ReactComponent as Keno } from 'src/assets/icons/keno.svg'
import { ReactComponent as Home } from 'src/assets/icons/home.svg'

const icons = {
  topUpWallet: <TopUpWallet />,
  dollar: <Dollar />,
  firstPrize: <FirstPrize />,
  secondPrize: <SecondPrize />,
  thirdPrize: <ThirdPrize />,
  chevronUp: <ChevronUp />,
  chevronDown: <ChevronDown />,
  login: <Login />,
  bigAndSmallFlag: <BigAndSmallFlag />,
  dollar16: <Dollar16 />,
  lottery: <Lottery />,
  bigAndSmall: <BigAndSmall />,
  keno: <Keno />,
  home: <Home />
}

export const Icon = (props) => {
  return <span {...props}>{icons[props.name]}</span>
}
