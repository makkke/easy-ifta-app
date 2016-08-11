import { Router } from 'express'

import auth from './auth.route'
import reports from './reports.route'
import users from './users.route'

const router = new Router()

router.get('/healthcheck', (req, res) =>
  res.json({})
)

router.use('/reports', reports)
router.use('/auth', auth)
router.use('/users', users)

export default router
