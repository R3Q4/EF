import { Router } from 'express'
import Mapcontroller from '../controller/map.controller.js'

const router = Router()

router.get("/", Mapcontroller.retrieve)

export default router
{/*import {Router} from 'express'
import MapController from '../controller/map.controller.js'

const router = Router()

router.get("/", MapController.retrieve)

export default router */}