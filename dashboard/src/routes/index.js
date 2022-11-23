import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const MyAccount = lazy(() => import('../pages/MyAccount'))
const Settings = lazy(() => import('../pages/Settings'))
const Platform = lazy(() => import('../pages/Platform'))
const Program = lazy(() => import('../pages/Program'))
const Vulnerability = lazy(() => import('../pages/Vulnerability'))
const Revenue = lazy(() => import('../pages/Revenue'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Page404 = lazy(() => import('../pages/404'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/account',
    component: MyAccount,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/platforms',
    component: Platform,
  },
  {
    path: '/programs',
    component: Program,
  },
  {
    path: '/revenues',
    component: Revenue,
  },
  {
    path: '/vulnerabilities',
    component: Vulnerability,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
