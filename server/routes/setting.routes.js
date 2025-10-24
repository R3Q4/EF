import { Router } from 'express'
import SettingController from '../controller/setting.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import userMiddleware from '../middleware/user.middleware.js'

const router = Router()

// Public Routes
router.post("/fields/user", userMiddleware, SettingController.changeFieldsUser)
router.post("/fields", authMiddleware, SettingController.changeFields)
router.post("/password", authMiddleware, SettingController.changePassword)
router.delete("/", authMiddleware, SettingController.deleteAccount)

export default router