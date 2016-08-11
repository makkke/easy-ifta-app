import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

import report from './modules/report/report.module'
import user from './modules/report/user.module'
import company from './modules/report/company.module'
import distances from './modules/report/distances.module'
import fuelPurchases from './modules/report/fuelPurchases.module'

import auth from './modules/auth/auth.module'

export default combineReducers({
  router: routerStateReducer,

  report,
  user,
  company,
  distances,
  fuelPurchases,

  auth,
})
