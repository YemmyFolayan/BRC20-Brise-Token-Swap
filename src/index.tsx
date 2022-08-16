import React, { StrictMode } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { ResetCSS } from '@evofinance9/uikit'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import MomentUtils from '@date-io/moment'
import Home from 'pages/Home'
import Advertise from 'pages/Advertise'
import Documentation from 'pages/Documentation'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ToastListener from './components/ToastListener'
import Providers from './Providers'
import { GRAPH_ENDPOINT } from './backend'
import 'inter-ui'
import './i18n'

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

const client = new ApolloClient({
  uri: GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <HashRouter>
          <Switch>
            <Route exact strict path="/" component={Home} />
            <Route exact strict path="/advertise" component={Advertise} />
            <Route exact strict path="/documentation" component={Documentation} />
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
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
)
