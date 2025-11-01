import pool from '../config/database.js'

/*
TABLE SCHEMA: accounts (id, email, password, username, role)
KEY: id
*/

class AccountDao {
    // CRUD
    async verify(userId, verified){
        const query = `UPDATE accounts SET verified= ? WHERE id = ?`
        const result =  await pool.execute(query, [verified, userId])
        return result
    }

    async reset(userId, newPassHash){
        const query = `UPDATE accounts SET password= ? WHERE id = ?`
        const [result] =  await pool.execute(query, [newPassHash, userId])
        return [result]
    }

    async retrieveInfo(user_id){
        const query = `SELECT * FROM users WHERE user_id = ?`
        const [result] = await pool.execute(query, [user_id])  
        return result
    }

    async updatePic(user_id, pic, connection = null) {
        const source = connection ?? pool

        const query = `UPDATE users SET pic = ? WHERE user_id = ?`
        const [result] = await source.execute(query, [pic, user_id])  
        return result.insertId
    }
    async updatePass(user_id, password){
        const query = `UPDATE accounts SET password= ? WHERE id = ?`
        const [result] = await pool.execute(query, [password, user_id])  
        return result
    }

    async retrievePic(user_id, connection = null) {
        const query = `SELECT pic FROM users WHERE user_id = ?`
        const [result] =  await pool.execute(query, [user_id])
        return result

    }
    
    async changeUsername(user_id, updatedUsername){
        const query = `UPDATE username FROM users WHERE user_id = ?`
        const [result] = await source.execute(query, [updatedUsername, user_id])  
        return result.insertId
    }

    async retrieveUsername(user_id){
        const query = `SELECT username FROM users WHERE user_id = ?`
        const [row] = await pool.execute(query, [user_id])
        return row[0]?.username
    }

    async retrieveEmail(user_id) {
        const query = `SELECT email FROM accounts WHERE id = ?`
        const [row] = await pool.execute(query, [user_id])
        return row[0]?.email
    }

    async retrieveGender(user_id) {
        const query = `SELECT gender FROM accounts WHERE id = ?`
        const [row] = await pool.execute(query, [user_id])
        return row[0]?.gender
    }

    async create(email, password, username, role, connection = null) {
        const source = connection ?? pool

        const query = `INSERT INTO accounts (email, password, username, role) VALUES (?, ?, ?, ?)`
        const [result] = await source.execute(query, [email, password, username, role])  
        return result.insertId
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

    async retrieveByEmail(email) {
        const query = `SELECT * FROM accounts WHERE email = ?`
        const [row] = await pool.execute(query, [email])
        return row[0]
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


    async updateInfo(user_id, fields) {
        // Update users table (username)
        if (fields.username) {
            await pool.execute(
                'UPDATE users SET username = ? WHERE user_id = ?',
                [fields.username, user_id]
            );
        }

        // Update accounts table (gender)
        if (fields.gender) {
            await pool.execute(
                'UPDATE accounts SET gender = ? WHERE id = ?',
                [fields.gender, user_id]
            );
        }

        // Optionally, return the updated profile
        const [userRow] = await pool.execute(
            'SELECT username FROM users WHERE user_id = ?',
            [user_id]
        );

        const [accountRow] = await pool.execute(
            'SELECT gender FROM accounts WHERE id = ?',
            [user_id]
        );

        return {
            username: userRow[0]?.username || null,
            gender: accountRow[0]?.email || null
        };
    }

    async delete(id) {
        const query = `DELETE FROM accounts where id = ?`
        const [result] = await pool.execute(query, [id])
        return result.affectedRows > 0
    }
    
    async confirmDelete(user_id) {
        const query = `DELETE FROM users where user_id = ?`
        const [result] = await pool.execute(query, [user_id])
        return result.affectedRows > 0
    }


}

export default new AccountDao()