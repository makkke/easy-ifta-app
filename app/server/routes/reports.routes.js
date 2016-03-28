import { Router } from 'express'
import * as controller from '../controllers/reports.controller'

const router = new Router()

router.route('/').post(controller.create)
router.route('/:id').get(controller.show)
router.route('/:id').put(controller.update)

export default router
