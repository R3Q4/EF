import MapService from '../service/map.service.js'

class MapController{
    async retrieve(req, res, next){
        try{
            const { datasetId, filters } = req.query
            const data= await MapService.retrieve(datasetId, filters)
            res.json(data)
        } catch(err) {
            console.log("Controller Error: map" + err)
            next(err)
        }
    }
    async nearest(req, res, next){
        try{
            const {datasetId, address, filters, limit} = req.query
            const nearLocation = await MapService.nearest(datasetId, address, filters, limit)
            res.json (nearLocation)
        } catch (err){
            console.log("Contoller Error: nearest" + err)
            next(err)
        }
    }
}
export default new MapController()