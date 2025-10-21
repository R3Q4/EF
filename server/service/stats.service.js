import{ fetchFromAPI } from '../utilities/api.js'

const formatData = () => {}
// Sample Data
//DataSeries,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013
//Waste Disposed Of,3.33,3.31,3.2,3.12,2.84,2.99,2.97,2.98,3.05,3.02,3.04,3.03
//    Domestic,1.66,1.67,1.63,1.58,1.53,1.55,1.56,1.61,1.66,1.73,1.74,1.71
//    Non-Domestic,1.67,1.64,1.57,1.54,1.31,1.44,1.41,1.37,1.39,1.3,1.3,1.32
//Waste Recycled,3.33,3.55,4.19,3.83,3.04,4.29,4.79,4.72,4.77,4.65,4.47,4.83

class StatsService{

    formatData = (data) => {
        // splitting into each line 
        const lines = data.trim().split('\n')
        // labels for each line
        const header = lines[0].split(',').map(s=>s.trim())
        // get year range
        const years = Headers.slice(1)

        const formattedData =[]
        for (let i =1; i<lines.length; i++){
            const line = lines[i].trim()
            const each = line.split(',').map(s=>s.trim())
            const label = each[0]
            const point = each.slice(1).map(Number)
        }
        formattedData.push({
            label, data:point
        })
    }
    
    async retrieve(datasetID){
        const fetchedData = await fetchFromAPI(datasetID)
        const formattedData = thie.formatData(fetchedData)
        return formattedData
    }
}
export default StatsService