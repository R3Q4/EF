import AccountService from '../service/account.service.js'

class AccountController {
    async retrieve(req, res, next) {
        try {
            const accounts = await AccountService.retrieve(req.query.keywords)
            res.json(accounts)
        } catch (err) {
            next(err)
        }
    }

    async toOwner(req, res, next) {
        try {
            const { id, organisation_name } = req.body
            await AccountService.elevateToOwner(id, organisation_name)
            res.status(201).json({message : "Privilege elevated successfully"})
        } catch (err) {
            next(err)
        }
    }

    async toAdmin(req, res, next) {
        try {
            await AccountService.elevateToAdmin(req.body.id)
            res.status(201).json({message : "Privilege elevated successfully"})
        } catch (err) {
            next(err)
        }
    }
}

export default new AccountController()