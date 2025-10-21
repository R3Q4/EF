import RecyclablesData from '../data/recyclables.data.js' 

class HomepageController{
    async retrieve(req, res, next){
        try{
            res.json(RecyclablesData)
        }catch(err){
            console.log("Controller Error")
            next(err)
        }
    }
}
export default new HomepageController()
