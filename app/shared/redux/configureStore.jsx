import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import DevTools from '../app/DevTools'
import { getReport } from './modules/report.module'

export function configureStore(initialState = {}) {
  let finalCreateStore

  if (process.env.CLIENT) {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
  } else {
    finalCreateStore = applyMiddleware(thunk)(createStore)
  }

  const store = finalCreateStore(rootReducer, initialState)

  store.dispatch(getReport())

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
