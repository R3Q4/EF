import ShareService from '../service/share.service.js'


class ShareController {
    async uploading(req, res, next) {
        try {
            
            const { title, tag } = req.body

            const user_id = req.user.id

            const img = req.file ? req.file.path : null

            await ShareService.upload( user_id||null, title||null, tag||null, img||null )
            res.status(201).json({message: "Shared successfully"})
        } catch (err) {
            next(err)
        }
    }  
     
    async retrieve(req, res, next) {
        try {
            const posts = await ShareService.retrieve()
            res.status(200).json(posts)
        } catch (err) {
            next(err)
        }
    }

    async like(req, res, next) {
        try {
            const user_id = req.user.id
            const { post_id } = req.body   
            await ShareService.like(user_id, post_id)
            res.status(200).json({message: "Post liked successfully"})
        } catch (err) {
            next(err)
        }   
    }

    async unlike(req, res, next) {  
        try {
            const user_id = req.user.id
            const { post_id } = req.body   
            await ShareService.unlike(user_id, post_id)
            res.status(200).json({message: "Post unliked successfully"})
        } catch (err) {
            next(err)
        }
    }

    async likeCount(req,res,next){
        try {
            const { post_id } = req.query   
            const count = await ShareService.likeCount(post_id)
            res.status(200).json({count})
        } catch (err) {
            next(err)
        }
    }

    async isLiked(req, res, next){
        try {
            const user_id = req.user.id
            const { post_id } = req.query
            const liked = await ShareService.isLiked(user_id, post_id)
            res.status(200).json({ liked })
        } catch (err) {
            next(err)
        }
    }


    async addComment(req, res, next){
        try {
            const user_id = req.user.id
            const { post_id, message } = req.body   
            await ShareService.addComment(user_id, post_id, message)
            res.status(200).json({message: "Post commented successfully"})
        } catch (err) {
            next(err)
        }
    }
    
    async retrieveComment(req, res, next){
        try {
            const { post_id } = req.query   
            const posts = await ShareService.retrieveComment(post_id)
            res.status(200).json(posts)
        } catch (err) {
            next(err)
        }
    }

    async deletePost(req, res, next){
        try {
            const { post_id } = req.query   
            await ShareService.deletePost(post_id)
            res.status(200).json({message: "Post deleted successfully"})
        } catch (err) {
            next(err)
        }
    }

}



export default new ShareController()