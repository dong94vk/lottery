import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import logo from 'src/assets/images/logo.png'
import { Icon } from '../common/icons/Index'
import { routes } from 'src/routes'

function Sidebar({ color }) {
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
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>VOD management</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {routes
          .filter((route) => route.showInSidebar)
          .map((route) => {
            return (
              <Menu.Item key={route.path}>
                <NavLink to={`/${route.path}`}>
                  <span
                    className="icon"
                    style={{
                      background: page === route.path ? color : '',
                    }}
                  >
                    {getMenuIcon(route.icon)}
                  </span>
                  <span className="label">{route.name}</span>
                </NavLink>
              </Menu.Item>
            )
          })}
      </Menu>
    </>
  )
}

export default Sidebar
