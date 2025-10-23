import {Router} from 'express'
import HomepageController from '../controller/homepage.controller.js'

const router = Router()

router.get("/what", HomepageController.retrieve)
router.get("/stats", HomepageController.retrieveStats)

export default router