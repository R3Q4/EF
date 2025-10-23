import {Router} from 'express'
import ChatbotController from '../controller/chatbot.controller.js'

const router = Router()

router.post("/", ChatbotController.retrieve)

export default router