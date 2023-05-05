import React, { Suspense, useEffect, lazy, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames';
import { useHistory } from 'react-router-dom'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Sidebar/Navbar'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'

const Page404 = lazy(() => import('../pages/404'))

function Layout() {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const userState = useSelector((state) => state.user)
  const history = useHistory()

  useEffect(() => {
    if(!userState.token){
      history.push("/login")
    }
  }, [userState])

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }

  useEffect(() => {
      const updateDimension = () => {
          setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
  
  
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [screenSize])

  return (
    <div
      className={classNames({
        "grid bg-zinc-100 min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
      />

      <div className="" style={{width: screenSize.width < 774 ? screenSize.width : collapsed ? screenSize.width - 64 : screenSize.width - 300}}>
      
      {screenSize.width < 774 && (
        <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
      )}
      
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  )
}

export default Layout
