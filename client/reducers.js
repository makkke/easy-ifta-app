import { combineReducers } from 'redux'

import report from './modules/report/report.module'
import user from './modules/report/user.module'
import company from './modules/report/company.module'
import distances from './modules/report/distances.module'
import fuelPurchases from './modules/report/fuelPurchases.module'

export default combineReducers({
  report,
  user,
  company,
  distances,
  fuelPurchases,
})
