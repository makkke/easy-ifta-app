import { Router } from 'express'
import validate from 'express-validation'
import jwt from 'express-jwt'

import config from '../config'
import validator from '../validators/users.validator'
import controller from '../controllers/users.controller'

const auth = jwt({
  secret: config.jwt.secret,
})
const router = new Router()

router.route('/me')
  .get(auth, controller.me)
  .put(auth, validate(validator.update), controller.update)

export default router
