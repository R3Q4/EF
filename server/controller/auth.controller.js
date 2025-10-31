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
            const result = await AuthService.register(req.body)
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    async verify (req, res, next){
        try {
            const {token} = req.query
            const result= await AuthService.verify(token)
            if (result) {res.redirect(`http://localhost:3000/redirect?status=success&token=${token}`)}
            else{res.redirect(`http://localhost:3000/redirect?status=fail`)}
        } catch (err) {
            res.redirect(`http://localhost:3000/redirect?status=fail`)
        }
    }

    async reset(req, res, next){
        try{
            const {token} = req.query
            console.log(token)
            const {newPass}= req.body 
            console.log(newPass)

            const result= await AuthService.reset(token, newPass)
                        console.log(result)

            if (result) {  res.status(200).json({ success: true, message: "Password reset successful" })
}
            else{res.status(400).json({ success: false, message: "Invalid token or user not found" })
}
        }
        catch(err){
            res.status(400).json({ success: false, message: "Password reset failed" })

        }
    }

    async forget(req, res, next) {
        try {
            const {email} = req.body
            console.log(req.body)
            if (!email) return res.status(400).json({success: false, message: "Email required"})
            
            const result = await AuthService.forget(email)
            
            if (result){ res.status(200).json({success: true, message : "Email sent successfully"}) }
            else{res.status(400).json({success: false, message : "Error please use a valid email or sign up instead"})}

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