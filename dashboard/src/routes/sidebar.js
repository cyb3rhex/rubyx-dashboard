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
    path: '/app/stats',
    icon: 'MoneyIcon',
    name: 'Stats',
  },
  {
    path: '/app/notes',
    icon: 'FormsIcon',
    name: 'Notes',
  },
  {
    path: '/app/platforms',
    icon: 'CardsIcon',
    name: 'Platforms',
  },
  {
    path: '/app/programs',
    icon: 'SearchIcon',
    name: 'Programs',
  },
]

export default routes
