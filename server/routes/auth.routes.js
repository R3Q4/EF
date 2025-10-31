import { Router } from 'express'
import AuthController from '../controller/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

// Public Routes
router.post("/register", AuthController.register)
router.get("/verify", AuthController.verify)

router.post("/login", AuthController.login)

router.post("/forget", AuthController.forget)
router.post("/reset", AuthController.reset)

router.post("/logout", authMiddleware, AuthController.logout)

export default router