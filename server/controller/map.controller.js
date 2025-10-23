
import MapService from '../service/map.service.js'

class MapController{
    async retrieve(req, res, next){
        try{
            const { datasetId, filters } = req.query
            const data= await MapService.retrieve(datasetId, filters)
            res.json(data)
        }catch(err){
            console.log("Controller Error: map" + err)
            next(err)
        }
    }


}
export default new MapController()
{/*
import MapService from '../service/map.service.js'

class MapController{
    async retrieve(req, res, next){
        try{
            const { datasetId } = req.query
            const data= await MapService.retrieve(datasetId)
            res.json(data)
        }catch(err){
            console.log("Controller Error: map" + err)
            next(err)
        }
    }
}
export default new MapController()*/}