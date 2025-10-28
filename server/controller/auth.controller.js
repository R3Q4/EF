import AuthService from '../service/auth.service.js'

class AuthController {
    async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body)
            res.json(result);
        } catch (err) {
            next(err)
        }
    }

    async register(req, res, next) {
        try {
            const user = await AuthService.register(req.body)
            res.status(201).json(user)
        } catch (err) {
            next(err)
        }
    }

    async forget(req, res, next) {
        try {
            await AuthService.forget(req.body)
            res.status(200).json({message : "Email sent successfully"})
        } catch (err) {
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            await AuthService.logout(req.token)
            res.status(200).json({message : "Logout successfully"})
        } catch (err) {
            next(err)
        }
    }
}

export default new AuthController()