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
            await SettingService.deleteAccount(req.user.id, req.user.role, req.token)
            res.status(201).json({message: "Account deleted successfully"})
        } catch (err) {
            next(err)
        }
    }
}

export default new SettingController()