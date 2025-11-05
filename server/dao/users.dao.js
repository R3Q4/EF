import pool from '../config/database.js'

/*
TABLE SCHEMA: users (id, privacy, donated, repaired, resold)
KEY: id
FOREIGN KEY: id
*/

class UserDAO {
    // CRUD
    async create(id, privacy, donated, repaired, resold, connection = null) {
        const source = connection ?? pool

        const query = `INSERT INTO users (id, privacy, donated, repaired, resold) VALUES (?, ?, ?, ?, ?)`
        const [result] = await source.execute(query, [id, privacy, donated, repaired, resold])  
        return result.insertId
    }

    async retrieve(id) {
        const query = `SELECT * FROM users WHERE id = ?`
        const [row] = await pool.execute(query, [id])
        return row[0]
    }

    async retrieve() {
        const query = `SELECT * FROM users`
        const [row] = await pool.query(query)
        return row
    }

    async update(id, field, value, connection = null) {
        const source = connection ?? pool

        const allowedFields = new Set(['id', 'privacy', 'donated', 'repaired', 'resold'])
        if (!allowedFields.has(field)) {throw new Error("Invalid field")}

        const query = `UPDATE users SET ${field} = ? WHERE id = ?`
        const [result] = await source.execute(query, [value, id])
        return result.affectedRows > 0
    }

    async delete(id, connection = null) {
        const source = connection ?? pool

        const query = `DELETE FROM users WHERE id = ?`
        const [result] = await source.execute(query, [id])
        return result.affectedRows > 0
    }

    async increase(id, field, more) {
        const allowedFields = new Set(['id', 'privacy', 'donated', 'repaired', 'resold'])
        if (!allowedFields.has(field)) {throw new Error("Invalid field")}

        if (typeof more != 'number') {throw new Error("Invalid value to increase")}

        const query = `UPDATE users SET ${field} = ${field} + ? WHERE id = ?`
        const [result] = await pool.execute(query, [more, id])
        return result.affectedRows > 0
    }
}

export default new UserDAO()