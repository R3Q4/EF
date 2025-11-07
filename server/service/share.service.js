import pool from '../config/database.js'

import shareDAO from '../dao/share.dao.js'



class ShareService {
    async upload(user_id, title, tag, img){
        await shareDAO.create( user_id, title, tag, img)
    }

    async retrieveShares(user_id) {
        const query = `SELECT * FROM shares WHERE user_id = ?`
        const [rows] = await pool.execute(query, [user_id])
        return rows
    }
    async retrieve(){

        const posts = await shareDAO.retrieve()
        return posts.sort((a, b) => new Date( b.created_at) - new Date( a.created_at))
    }

    async like(user_id, post_id){
        await shareDAO.like(user_id, post_id)
    }
    async unlike(user_id, post_id){
        await shareDAO.unlike(user_id, post_id)
    }
    async likeCount(post_id){
        return await shareDAO.likeCount(post_id)
    }

    async isLiked(user_id, post_id) {
        return await shareDAO.isLiked(user_id, post_id)
    }

    async addComment(user_id, post_id, message){
        await shareDAO.addComment(user_id, post_id, message)
        
    }

    async retrieveComment(post_id){
        const comments = await shareDAO.retrieveComment(post_id)
        return comments
        
    }

    async deletePost(post_id){
        await shareDAO.deletePost(post_id)
    }
}
export default new ShareService()