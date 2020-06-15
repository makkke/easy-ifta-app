import { combineReducers } from 'redux'

// import report from './modules/report/report.module'
// import user from './modules/report/user.module'
// import company from './modules/report/company.module'
import app from './modules/app/app.module'
import distances from './modules/distances/distances.module'
import fuelPurchases from './modules/fuelPurchases/fuelPurchases.module'

import auth from './modules/auth/auth.module'
import taxReturn from './modules/taxReturn/taxReturn.module'

export default combineReducers({
  // report,
  // user,
  // company,
  // distances,

  app,
  auth,
  taxReturn,
  distances,
  fuelPurchases,
})
