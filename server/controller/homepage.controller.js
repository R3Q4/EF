import RecyclablesData from '../data/recyclables.data.js' 
import StatsService from '../service/stats.service.js'
class HomepageController{
    async retrieve(req, res, next){
        try{
            res.json(RecyclablesData)
        }catch(err){
            console.log("Controller Error: homepage" + err)
            next(err)
        }
    }

    async retrieveStats(req, res, next){
        const statsService = new StatsService()
        try{
            const { datasetId } = req.query
            const data= await statsService.retrieve(datasetId)
            res.json(data)
        }catch(err){
            console.log("Controller Error: map" + err)
            next(err)
        }
    }    
}
export default new HomepageController()
