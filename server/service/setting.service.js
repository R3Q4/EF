import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import pool from '../config/database.js'
import accountsDao from '../dao/accounts.dao.js'
import usersDao from '../dao/users.dao.js'
import { verifyPassword, verifyEmail } from '../utilities/validator.js'
import { blacklistToken } from '../utilities/blacklister.js'
import { send } from '../utilities/mailer.js'

dotenv.config()

class SettingService {
    async retrieveInfo(user_id){
        await accountsDao.retrieveInfo(user_id)
        return result
    }
    
    async updateUser(user_id, username, gender){
        const fieldsToUpdate = {}
        if (username) {fieldsToUpdate.username = username}
        if (gender) {fieldsToUpdate.gender = gender}

        const result = await accountsDao.updateInfo(user_id, fieldsToUpdate)
        return this.retrieveProfile(user_id)
    }
    
    async changePic(user_id, pic){
        await accountsDao.updatePic(user_id, pic)
    }
    
    async retrievePic(user_id){
        const result = await accountsDao.retrievePic(user_id, true)
        return (result && result.length >0) ? result[0] : null
    }
    async updatedUsername(user_id, updatedUsername){
        const result = await accountsDao.changeUsername(user_id, updatedUsername)
        return result
    }

    async retrieveUsername(user_id){
        const result = await accountsDao.retrieveUsername(user_id)
        return result
    }

    async retrieveProfile(user_id){
        const pic = await accountsDao.retrievePic(user_id)
        const username = await accountsDao.retrieveUsername(user_id)
        const gender = await accountsDao.retrieveGender(user_id)
        const profile = {
            pic: pic|| null,
            username: username, 
            gender : gender
        }
        return profile
    }

    async changeFields(id, updatedDetails) {
        if (updatedDetails.username) {
            await this.changeUsername(id, updatedDetails.username)
        } 

        if (updatedDetails.email) {
            await this.changeEmail(id, updatedDetails.email)
        }
    }

    async changeFieldsUser(id, updatedDetails) {
        await this.changeFields(id, updatedDetails)

        if (updatedDetails.privacyBool && typeof updatedDetails.privacyBool == 'boolean') {
            await this.changePrivacy(id, updatedDetails.privacyBool)
        }
    }

    async changeUsername(id, new_username) {
        const existing = await accountsDao.retrieveByUsername(new_username)
        
        if (existing) {
            throw new Error("The username is already taken")
        }

        await accountsDao.update(id, 'username', new_username)
    }

    async changeEmail(id, new_email) {
        const validEmail = verifyEmail(new_email) 

        if (!validEmail) {
            throw new Error("Invalid Email")
        }

        const existing = await accountsDao.retrieveByEmail(new_email)

        if (existing) {
            throw new Error("The email is already taken")
        }

        await accountsDao.update(id, 'email', new_email)
    }

    async changePassword(id, old_password, new_password, token) {
        const user = await accountsDao.retrieveById(id)
        if (!user || !(await bcrypt.compare(old_password, user.password))) {
            const error = new Error("Invalid Credentials")
            error.status = 401
            throw error
        }

        const validPassword = verifyPassword(new_password) 

        if (!validPassword) {
            throw new Error("Invalid Password")
        }

        const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10
        const hashedPassword = await bcrypt.hash(new_password, rounds)
        const affectedRows = await accountsDao.update(id, 'password', hashedPassword)

        if (affectedRows > 0) {
            blacklistToken(token)

            const Email_Sub = 'Automatic Email for Password Change'
            const Email_Msg = 'Hello! Your password has been changed recently.'

            try {
                await send(user.email, Email_Sub, Email_Msg)
            } catch (err) {
                throw new Error('Failed to send an email. Password has been changed.')
            }
        }
    }
    
    async changePrivacy(id, privacyBool) {
        await usersDao.update(id, 'privacy', privacyBool)
    }

    async deleteAccount(user_id, token) {
        try {
            const email = await accountsDao.retrieveEmail(user_id)
            const link = `http://localhost:5000/settings/deleteAccount?token=${token}`
            const Email_Sub = 'Automatic Email for Deleting Account'
            const Email_Msg = `Click on the following link to delete your account`
        
            // Delete account email
            await send(email, link, Email_Sub, Email_Msg)
            return true
        } catch (err) {
            return false
        } 
        
    }

    async confirmDelete(token) {
        try{
            console.log("SS")
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userId = decoded.id
            console.log(userId)
            await accountsDao.delete(userId)
            await accountsDao.confirmDelete(userId) 
            return true   
        }
        catch (err) { return false}

    }
}

export default new SettingService()