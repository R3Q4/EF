import { Router } from 'express'
import AccountController from '../controller/account.controller.js'
import adminMiddleware from '../middleware/admin.middleware.js'

const router = Router()

// Public Routes
router.get('/', adminMiddleware, AccountController.retrieve)
router.post('/elevate/admin', adminMiddleware, AccountController.toAdmin)

export default router