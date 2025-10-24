import { Router } from 'express'
import EnquiryController from '../controller/enquiry.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import verifyToken from '../utilities/verifier.js'
const router = Router()

// Public Routes

router.post("/upload", verifyToken, EnquiryController.upload)
router.get("/retrieve", verifyToken, EnquiryController.retrieve)


export default router