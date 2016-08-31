import { Router } from 'express'
import validate from 'express-validation'
import jwt from 'express-jwt'

import config from '../config'
import validator from '../validators/taxReturns.validator'
import controller from '../controllers/taxReturns.controller'

const auth = jwt({
  secret: config.jwt.secret,
})
const router = new Router()

router.route('/')
  .get(auth, controller.index)
  .post(auth, validate(validator.create), controller.create)

router.route('/:id')
  .get(auth, controller.show)
  .put(auth, validate(validator.update), controller.update)

router.route('/:year/:quarter')
  .get(auth, controller.showByPeriod)

export default router
