import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from '../common/icons'
import { routes } from 'src/routes'
import './index.css'

function Sidebar() {
  const { pathname } = useLocation()
  const page = pathname.replace('/', '')
  const getMenuIcon = (icon) => {
    return typeof icon === 'string' ? (
      <Icon name={icon} />
    ) : (
      icon
    )
  }

  return (
    <Menu className="bg-transparent pt-[20px] flex flex-col justify-center items-center" defaultSelectedKeys={[page]}>
      {routes
        .filter((route) => route.showInSidebar)
        .map((route) => {
          return (
            <Menu.Item key={route.path} className="!mt-3 !w-[50px] !h-[50px]">
              <NavLink to={`/${route.path}`}>
                {getMenuIcon(route.icon)}
              </NavLink>
            </Menu.Item>
          )
        })}
    </Menu>
  )
}

export default Sidebar
