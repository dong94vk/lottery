import { Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import history from './services/history/index'
import { routes } from './routes'
import { ReactNotifications } from 'react-notifications-component'
import PrivateLayout from './layouts/Private.jsx'
import { PublicLayout } from './layouts/Public'

function App() {
  return (
    <Suspense fallback={() => null}>
      <ReduxProvider store={store}>
        <ReactNotifications />
        <BrowserRouter history={history}>
          <Routes>
            {routes.map((route) => {
              return route?.isPublic ? (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  element={
                    <PublicLayout>
                      <route.component />
                    </PublicLayout>
                  }
                />
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  element={
                    <PrivateLayout>
                      <route.component />
                    </PrivateLayout>
                  }
                />
              )
            })}
            <Route path="*" element={<Navigate to="/lottery" />} />
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </Suspense>
  )
}

export default App
