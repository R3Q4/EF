import { Router } from 'express'
import SettingController from '../controller/setting.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import userMiddleware from '../middleware/user.middleware.js'
import verifyToken from '../utilities/verifier.js'

import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
const router = Router()

// Public Routes
router.post("/fields/user", userMiddleware, SettingController.changeFieldsUser)
router.post("/fields", authMiddleware, SettingController.changeFields)
router.post("/password", authMiddleware, SettingController.changePassword)
router.delete("/", authMiddleware, SettingController.deleteAccount)

router.post("/pic", verifyToken, upload.single('image'), SettingController.changePic)
router.get("/retrieve", verifyToken, SettingController.retrievePic)
router.get("/retrieveUser/:userId", verifyToken, SettingController.retrieveUser)



export default router