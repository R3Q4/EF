import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { isBlacklisted } from '../utilities/blacklister.js'

dotenv.config()

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Unauthorized: No token provided")
    }

    const token = authHeader.split(" ")[1]

    if (isBlacklisted(token)) {
        return res.status(401).json({error: "Token revoked"})
    }
    let decoded
    try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        return res.status(401).json({error : "Error with token"})
    }


    if (!decoded.id || !decoded.role) return res.status(401).json({ error: "Invalid token payload" })

    req.user = decoded
    req.token = token

    next()
}

export default verifyToken