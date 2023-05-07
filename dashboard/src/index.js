import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import 'react-toastify/dist/ReactToastify.css';
import App from './App'
import theme from './components/theme'
import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences theme={theme}>
        <App />
      </Windmill>
    </Suspense>,
  document.getElementById('root')
)

serviceWorker.register()
