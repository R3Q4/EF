import { expressjwt as jwt } from 'express-jwt'
import dotenv from 'dotenv'
import blacklist from 'express-jwt-blacklist'

dotenv.config()

const tokenBlacklist = new Set()
blacklist.configure({ tokenBlacklist })

export const blacklistToken = (token) => tokenBlacklist.add(token)
export const isBlacklisted = (token) => tokenBlacklist.has(token)


const checkJWT = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
})

export default checkJWT