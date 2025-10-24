import pool from '../config/database.js'

/*
TABLE SCHEMA: accounts (id, email, password, username, role)
KEY: id
*/

class AccountDao {
    // CRUD
    async create(email, password, username, role, connection = null) {
        const source = connection ?? pool

        const query = `INSERT INTO accounts (email, password, username, role) VALUES (?, ?, ?, ?)`
        const [result] = await source.execute(query, [email, password, username, role])  
        return result.insertId
    }

    async retrieveByEmail(email) {
        const query = `SELECT * FROM accounts WHERE email = ?`
        const [row] = await pool.execute(query, [email])
        return row[0]
    }

    async retrieveById(id) {
        const query = `SELECT * FROM accounts WHERE id = ?`
        const [row] = await pool.execute(query, [id])
        return row[0]
    }

    async retrieveByUsername(username) {
        const query = `SELECT * FROM accounts WHERE username = ?`
        const [row] = await pool.execute(query, [username])
        return row[0]
    }

    async retrieve() {
        const query = `SELECT * FROM accounts`
        const [rows] = await pool.query(query)
        return rows
    }

    async update(id, field, value, connection = null) {
        const source = connection ?? pool

        // Validate field input
        const allowedFields = new Set(['email', 'password', 'username', 'role'])
        if (!allowedFields.has(field)) {throw new Error('Invalid field')}
        
        // Query
        const query = `UPDATE accounts SET ${field} = ? WHERE id = ?`
        const [result] = await source.execute(query, [value, id])
        return result.affectedRows > 0
    }

    async delete(id, connection = null) {
        const source = connection ?? pool

        const query = `DELETE FROM accounts where id = ?`
        const [result] = await source.execute(query, [id])
        return result.affectedRows > 0
    }
}

export default new AccountDao()