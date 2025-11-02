import { Router } from 'express'
import ShareController from '../controller/share.controller.js'
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
router.post("/upload", verifyToken, upload.single('image'), ShareController.uploading)
router.get("/retrieve", verifyToken, ShareController.retrieve)

router.post("/like", verifyToken, ShareController.like)
router.post("/unlike", verifyToken, ShareController.unlike)
router.get("/likeCount", verifyToken, ShareController.likeCount)

router.post("/addComment", verifyToken, ShareController.addComment)
router.get("/retrieveComment", verifyToken, ShareController.retrieveComment)

router.delete("/delete", verifyToken, ShareController.deletePost)


export default router