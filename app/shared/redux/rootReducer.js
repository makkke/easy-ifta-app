import { combineReducers } from 'redux'
import report from './modules/report.module'
import user from './modules/user.module'
import company from './modules/company.module'
import distances from './modules/distances.module'
import fuelPurchases from './modules/fuelPurchases.module'

export default combineReducers({
  report,
  user,
  company,
  distances,
  fuelPurchases,
})
