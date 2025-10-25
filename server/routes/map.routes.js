import {Router} from 'express'
import MapController from '../controller/map.controller.js'

const router = Router()

router.get("/", MapController.retrieve)
router.get("/nearest", MapController.nearest)

export default router 