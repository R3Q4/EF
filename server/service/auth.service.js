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
            const error = new Error("Invalid Email")
            error.status = 400
            throw error}

        // Verify User
        const user = await accountDao.retrieveByEmail(email)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            const error = new Error("Wrong Password")
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
            const error = new Error("Invalid Email")
            error.status = 400
            throw error}

        if (!validPassword) {
            const error = new Error("Error! Password must be at least 8 characters and include a mix of letters, numbers and symbols")
            error.status = 400
            throw error
        }

        // Check for existing users
        const existing = await accountDao.retrieveByEmail(email)
        if (existing) {
            const error = new Error("Error! User already exists")
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
            const user = await accountDao.create(email, hashedPassword, new_username, 'user', connection)
            
            await userDao.create(user, false, 0, 0, 0, connection)

            await connection.commit()
            const token = jwt.sign({ id: user, role: 'user'}, process.env.JWT_SECRET, { expiresIn: "1h" })
            
            const url = `http://localhost:5000/auth/verify?token=${token}`
            const sub = 'Verify your Ecofind account'
            const msg = 'Please verify your account by clicking the link below'

            await send(email, url, sub, msg)

            return {message: 'Registration successful. Please check you email to verify your account before logging in.'}
        } catch (err) {
            console.log(err)
            if (connection) await connection.rollback()
            throw new Error("Error creating account. Please try again.")
        } finally {
            if (connection) connection.release()
        }
    }

    async verify(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userId = decoded.id
            await accountDao.verify(userId, true)
            return true

        } catch (err){
            return false
        }
    }     
        
    async reset(token, newPass){
        try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        console.log(userId, decoded)
    

        // setting hashed password
        const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10
        const newPassHash = await bcrypt.hash(newPass, rounds)

        await accountDao.reset(userId, newPassHash)
        return true

        } catch (err){
            return false
        }
    }

    async forget( email ) {
        // Check for valid email
        const validEmail = verifyEmail(email)
        

        // Check for registerd email
        const existing = await accountDao.retrieveByEmail(email)
        if (!existing) throw new Error("Unregistered email")

        // Create a reset token
        const { id } = existing
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '15m' })

        // Send Forget Password email
        const link = `http://localhost:3000/reset?token=${token}`
        const Email_Sub = 'Automatic Email for Forget Password'
        const Email_Msg = `Click on the following link to reset your password`
        
        try {
            await send(email, link, Email_Sub, Email_Msg)
            return true
        } catch (err) {
            throw new Error('failed to send an email')
        }
    }

    async logout(token) {
        blacklistToken(token)
    }
}

export default new AuthService()