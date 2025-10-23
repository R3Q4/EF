import ChatbotService from '../service/chatbot.service.js'

class ChatbotController{
    async retrieve(req,res,next){
        try{
            const { msg } = req.body

            if (!msg || !Array.isArray(msg)){return res.status(400).json({error: "Invalid Message"})}

            const data= await ChatbotService.retrieve(msg)
            res.json(data)
        }catch(err){
            next(err)
        }
    }
}
export default new ChatbotController()