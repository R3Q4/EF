import pool from '../config/database.js'

class EnquiryDAO {
    async create(user_id, category, subject, message, status){
        const query = `INSERT INTO enquiries (user_id, category, subject, message, status) VALUES (?, ?, ?, ?, ?)` 
        const [result] = await pool.execute(query, [user_id, category, subject, message, status])
        return result.insertId
    }

    async retrieve(user_id){
        const query = `SELECT * FROM enquiries WHERE user_id = ? ORDER BY created_at DESC` 
        const [rows] = await pool.query(query, [user_id])
        return rows
    }

}
export default new EnquiryDAO()