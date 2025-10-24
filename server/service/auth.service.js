import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import pool from '../config/database.js'
import accountDao from '../dao/accounts.dao.js'
import userDao from '../dao/users.dao.js'
import { verifyPassword, verifyEmail } from '../utilities/validator.js'
import { blacklistToken } from '../utilities/blacklister.js'
import { send } from '../utilities/mailer.js'

dotenv.config()

class AuthService {
    async login({ email, password }) {
        const validEmail = verifyEmail(email)

        if (!validEmail) {
            throw new Error("Invalid email or password")
        }

        // Verify User
        const user = await accountDao.retrieveByEmail(email)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            const error = new Error("Invalid Credentials")
            error.status = 401
            throw error
        }

        // Generate Token
        const token = jwt.sign({ id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1h" })
        return token
    }

    async register({ email, password }) {
        // Check for email and password validity
        const validEmail = verifyEmail(email)
        const validPassword = verifyPassword(password)

        if (!validEmail) {
            throw new Error("Invalid email ")
        }

        if ( !validPassword) {
            throw new Error("Invalid password")
        }

        // Check for existing users
        const existing = await accountDao.retrieveByEmail(email)
        if (existing) {
            const error = new Error("User already exists")
            error.status = 409
            throw error
        }

        // Generate Username
        const users = await accountDao.retrieve()
        let last_user_id
        if (users && users.length > 0) {
            last_user_id = users[users.length - 1].id
        } else {
            last_user_id = 0
        }
        const new_username = `user${last_user_id + 1}`

        // hash password
        const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10
        const hashedPassword = await bcrypt.hash(password, rounds)

        let connection
        try {
            connection = await pool.getConnection()
        
            await connection.beginTransaction()

            // Create user account and settings fields
            const user_id = await accountDao.create(email, hashedPassword, new_username, 'user', connection)
            await userDao.create(user_id, false, 0, 0, 0, connection)

            await connection.commit()

            return user_id
        } catch (err) {
            console.log(err)
            if (connection) await connection.rollback()
            throw new Error("Failed to create account")
        } finally {
            if (connection) connection.release()
        }
    }

    async forget({ email }) {
        // Check for valid email
        const validEmail = verifyEmail(email)
        if (!validEmail) throw new Error("Invalid email")

        // Check for registerd email
        const existing = await accountDao.retrieveByEmail(email)
        if (!existing) throw new Error("Unregistered email")

        // Create a reset token
        const { user_id, role } = existing
        const token = jwt.sign({ id: user_id, role: role }, process.env.JWT_SECRET, { expiresIn: '15m' })

        // Send Forget Password email
        const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
        const Email_Sub = 'Automatic Email for Forget Password'
        const Email_Msg = `Click on the following link to reset your password ${link}`

        try {
            await send(email, Email_Sub, Email_Msg)
        } catch (err) {
            throw new Error('failed to send an email')
        }
    }

    async logout(token) {
        blacklistToken(token)
    }
}

export default new AuthService()