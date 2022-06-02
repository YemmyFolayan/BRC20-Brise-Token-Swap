import React, { StrictMode } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { ResetCSS } from '@evofinance9/uikit'
import Home from 'pages/Home'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ToastListener from './components/ToastListener'
import Providers from './Providers'
import 'inter-ui'
import './i18n'

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <Switch>
        <Route exact strict path="/" component={Home} />
        <Providers>
          <>
            <ListsUpdater />
            <ApplicationUpdater />
            <TransactionUpdater />
            <MulticallUpdater />
            <ToastListener />
          </>
          <ResetCSS />
          <GlobalStyle />
          <App />
        </Providers>
      </Switch>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
)
