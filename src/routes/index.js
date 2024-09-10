
import { NotFound } from 'src/pages/NotFound/Index'
import { LotteryPage } from 'src/pages/Lottery/Index'
import { BigAndSmall } from 'src/pages/BigAndSmall/Index'
import { Home } from 'src/pages/Home'

export const routes = [
  {
    path: '404',
    name: 'Not Found',
    component: NotFound,
    showInSidebar: false,
    isPublic: true,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    showInSidebar: false,
    isPublic: false,
  },
  {
    path: 'lottery',
    name: 'Game Lottery',
    component: LotteryPage,
    showInSidebar: true,
    isPublic: false,
  },
  {
    path: 'big-and-small',
    name: 'Big and mall',
    component: BigAndSmall,
    showInSidebar: true,
    isPublic: false,
  }
]
