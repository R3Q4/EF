import pool from '../config/database.js'
import accountDao from '../dao/accounts.dao.js'
import userDao from '../dao/users.dao.js'

const matchKeywords = (account, keywords) => {
    if (!keywords) return true

    const keywordsArr = [].concat(keywords).flatMap(k => k.split(','))
    return keywordsArr.every(kw => 
        account.username.toLowerCase().includes(kw.toLowerCase()) || 
        account.email.toLowerCase().includes(kw.toLowerCase())
    )
}

class AccountService {
    async retrieve(keywords) {
        const accounts =  await accountDao.retrieve()
        const filtered_accounts = accounts.filter(account => matchKeywords(account, keywords))

        const result = filtered_accounts.map(({ id, username, role }) => ({ id, username, role }))
        return result
    }


    async elevateToAdmin(id) {
        let connection
        try {
            connection = await pool.getConnection()

            await connection.beginTransaction()

            await accountDao.update(id, 'role', 'admin', connection)
            await userDao.delete(id, connection)
            await ownerDao.delete(id, connection)

            await connection.commit()
        } catch (err) {
            if (connection) await connection.rollback()
            throw new Error("Elevation operation failed")
        } finally {
            if (connection) connection.release()
        }
    }
}

export default new AccountService()