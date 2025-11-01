import SettingService from '../service/setting.service.js'

class SettingController {
    async retrieveInfo(req, res, next) {
        try {
            const user_id = req.user.id
            const result = await SettingService.retrieveInfo(user_id)
            res.status(200).json(result) 
        } catch (err) {
            next(err)
        }
    }

    async retrieveId(req, res, next) {
        try {
            const user_id = req.user.id
            res.status(200).json({user_id}) 
        } catch (err) {
            next(err)
        }
    
    }
    async changeUsername (req, res, next)
    {
        try{
            const user_id = req.user.id
            const {newUsername} = req.body
             await SettingService.changeUsername(user_id, newUsername)
        } catch (err) {
            next(err)
        }
    }

    async changePic(req, res, next) {
        const user_id = req.user.id
        const pic = req.file ? req.file.filename: null
        await SettingService.changePic( user_id||null, pic||null )
        res.status(201).json({message: "Profile picture uploaded successfully"})
    }

    async retrievePic(req, res, next) {
        try {
            const user_id = req.user.id
            const profile = await SettingService.retrievePic(user_id)
            res.status(200).json(profile) 
        } catch (err) {
            next(err)
        }
    
    }

    async retrieveUser(req, res, next) {
        try {

            let user_id = req.params.userId
            if (!user_id) {
                user_id = req.user.id
            }
            const profile = await SettingService.retrieveProfile(user_id)

            res.status(200).json(profile)
        } catch (err) {
            next(err)
        }
    }

    async updateUser(req,res,next){
        try {

            const user_id = req.user.id
            const {username, gender } = req.body
            if (!username && !gender){return  res.status(400).json({error: 'Nothing to update'})}

            const profile = await SettingService.updateUser(user_id, username, gender)

            res.status(200).json(profile)
        } catch (err) {
            next(err)
        }
    }
    
    async retrieveUsername(req, res, next){
        try {
            const user_id = req.user.id
            const profile = await SettingService.retrieveProfile(user_id)
            const {username} = profile
            res.status(200).json({username})
        } catch (err) {
            next(err)
        }
    }

    async changeFieldsUser(req, res, next) {
        try {
            await SettingService.changeFieldsUser(req.user.id, req.body.updatedDetails)
            res.status(201).json({message: "Details updated successfully"})
        } catch (err) {
            next(err)
        }
    }

    async changeFields(req, res, next) {
        try {
            await SettingService.changeFields(req.user.id, req.body.updatedDetails)
            res.status(201).json({message: "Details updated successfully"})
        } catch (err) {
            next(err)
        }
    }

    async changePassword(req, res, next) {
        try {
            await SettingService.changePassword(req.user.id, req.body.old_password, req.body.new_password, req.token) 
            res.status(201).json({message: "Password changed successfully"})
        } catch (err) {
            next(err)
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            const user_id = req.user.id
            const result = await SettingService.deleteAccount(user_id, token)
            if (result) {  res.status(200).json({ success: true, message: "Account deletion email successful" })
            }
            else{res.status(400).json({ success: false, message: "Invalid token or user not found" })
            }

        } catch (err) {
            res.status(400).json({ success: false, message: "Account deletion failed" })
        }
    }

    async confirmDelete(req,res){
        try{
        const {token} = req.query
        await SettingService.confirmDelete(token)

        res.redirect(`http://localhost:3000/deleteAccount?status=success&token=${token}`)}


    catch (err){
            res.redirect(`http://localhost:3000/deleteAccount?status=fail`)

        }

}}

export default new SettingController()