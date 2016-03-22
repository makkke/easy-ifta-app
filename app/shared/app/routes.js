import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Error404Page from './Error404Page'
import ReportPage from '../reports/ReportPage'

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={ReportPage} />
    <Route path="*" component={Error404Page} />
  </Route>
)

export default routes
