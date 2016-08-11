import { Router } from 'express'
import jwt from 'express-jwt'

import config from '../config'
import { me } from '../controllers/users.controller'

const auth = jwt({
  secret: config.jwt.secret,
})
const router = new Router()

router.route('/me')
  .get(auth, me)

export default router
