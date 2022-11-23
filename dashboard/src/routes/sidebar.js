/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/revenues',
    icon: 'MoneyIcon',
    name: 'Revenues',
  },
  {
    path: '/app/platforms',
    icon: 'CardsIcon',
    name: 'Platforms',
  },
  {
    path: '/app/programs',
    icon: 'FormsIcon',
    name: 'Programs',
  },
  {
    icon: 'PagesIcon',
    name: 'Data',
    routes: [
      // submenu
      {
        path: '/app/subdomains',
        name: 'Subdomains',
      },
      {
        path: '/app/urls',
        name: 'Urls',
      },
      {
        path: '/app/ips',
        name: 'IP',
      },
      {
        path: '/app/vulnerabilities',
        name: 'Vulnerabilities',
      },
      {
        path: '/app/screenshots',
        name: 'Screenshots',
      }
    ],
  },
]

export default routes
