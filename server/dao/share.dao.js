import pool from '../config/database.js'

/*
TABLE SCHEMA: 
KEY: 
FOREIGN KEY: 
*/

class ShareDao {
            
    async create(user_id, title, tag, img, connection = null){
        const source = connection ?? pool

        const query = `INSERT INTO shares (user_id, title, tag, img) VALUES (?, ?, ?, ?)`
        const [result] = await source.execute(query, [user_id, title, tag, img])  
        return result.insertId
    }
    async retrieve(){

        const query = `SELECT * from shares ORDER BY shared_at DESC`
        const [rows] = await pool.query(query)
        return rows        
    }
    async like(user_id, post_id, connection = null){
        const source = connection ?? pool
        const query = `INSERT IGNORE INTO likes (user_id, post_id) VALUES (?, ?)`
        const [result] = await source.execute(query, [user_id, post_id])  
        return result.insertId
    }
    async unlike(user_id, post_id, connection = null){
        const source = connection ?? pool
        const query = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`
        const [result] = await source.execute(query, [user_id, post_id])  
        return result.affectedRows > 0
    }
    async addComment (user_id, post_id, message, connection = null){
        const source = connection ?? pool
        const query = `INSERT INTO comments (user_id, post_id, message) VALUES (?, ?, ?)`
        const [result] = await source.execute(query, [user_id, post_id, message])  
        return result.insertId
    }

    async retrieveComment(post_id, connection = null){
        const source = connection ?? pool
        const query = `SELECT * from comments WHERE post_id =?`
        const [rows] = await pool.query(query, [post_id])
        return rows   
    }

    async deletePost(post_id, connection = null){
        const source = connection ?? pool
        const query = `DELETE FROM shares WHERE id = ?`
        const [result] = await source.execute(query, [post_id])  
        return result.affectedRows > 0
    }
}

export default new ShareDao()