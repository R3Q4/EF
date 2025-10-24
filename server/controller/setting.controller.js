import SettingService from '../service/setting.service.js'

class SettingController {
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