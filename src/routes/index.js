
import { NotFound } from 'src/pages/NotFound/Index'
import { LotteryPage } from 'src/pages/Lottery/Index'

export const routes = [
  {
    path: '404',
    name: 'Not Found',
    component: NotFound,
    showInSidebar: false,
    isPublic: true,
  },
  {
    path: 'lottery',
    name: 'Game Lottery',
    component: LotteryPage,
    showInSidebar: true,
    isPublic: false,
  }
]
