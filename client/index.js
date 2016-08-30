import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { configureStore } from './store'
import { loginSuccess, loadMe } from './modules/auth/auth.module'
import { loadLatestTaxReturn } from './modules/taxReturn/taxReturn.module'

// Initialize store
const store = configureStore(window.__INITIAL_STATE__)
const mountApp = document.getElementById('root')

// Login if token exists in local storage
const token = localStorage.getItem('token')
if (token) {
  store.dispatch(loginSuccess(token))
  store.dispatch(loadMe())
  store.dispatch(loadLatestTaxReturn())
}

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp
)

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default // eslint-disable-line global-require

    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp
    )
  })
}
