import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'react-notifications-component/dist/theme.css'
import './assets/styles/main.css'
import './assets/styles/responsive.css'
import { ConfigProvider } from 'antd'
import { theme } from './antd.config'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
