import { Router } from 'express'

import auth from './auth.route'
import users from './users.route'
import taxReturns from './taxReturns.route'

const router = new Router()

router.get('/', (req, res) =>
  res.json()
)

router.use('/taxReturns', taxReturns)
router.use('/auth', auth)
router.use('/users', users)

export default router
