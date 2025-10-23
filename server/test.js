
import StatsService from './service/stats.service.js'

async function testRetrieve() {
  const service = new StatsService()

  try {
    const datasetID = 'd_72f8e05d45477a7af0c089ad970519da'  // <-- Replace with a real dataset ID your API accepts
    console.log(`Fetching data for datasetID: ${datasetID} ...`)

    const result = await service.retrieve(datasetID)

    console.log('Formatted result:', JSON.stringify(result, null, 2))
  } catch (error) {
    console.error('Error fetching or formatting data:', error)
  }
}

testRetrieve()

{/*// test.js
import MapService from './service/map.service.js'

const test = async () => {
    try {
        const data = await MapService.retrieve('d_db40d004afeb5a7f0f555fdcc34934cc', 'tampines')
        console.log('Retrieved data:', data)
    } catch (err) {
        console.error('Test Error:', err.message)
    }
}

test()
*/}