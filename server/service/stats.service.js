import{ fetchFromAPI } from '../utilities/api.js'

class StatsService{

    formatData = (data) => {
        // splitting into each line 
        const lines = data.trim().split('\n')
        // labels for each line
        const header = lines[0].split(',').map(s=>s.trim())
        // get year range
        const years = header.slice(1)

        const formattedData =[]
        for (let i =1; i<lines.length; i++){
            const line = lines[i].trim()
            const each = line.split(',').map(s=>s.trim())
            const label = each[0]
            const point = each.slice(1).map(Number)
            formattedData.push({
                label, data:point
        })}
        return{labels: years, datasets: formattedData}

        
    }
    
    async retrieve(datasetID){
        const fetchedData = await fetchFromAPI(datasetID)
        const formattedData = this.formatData(fetchedData)
        return formattedData
    }
}
export default StatsService