import { fetchFromAPI } from "../utilities/api.js"

const formatData = (rawData) => {
  if (!rawData.features) return [];

  return rawData.features.map(feature => {
    const { geometry, properties } = feature;

    // Normalize address for datasets with complex structure
    const fullAddress =
      properties.FULLADDRESS || // Dataset A
      properties.ADDRESSSTREETNAME || // EWASTE
      [
        properties.ADDRESSBLOCKHOUSENUMBER,
        properties.ADDRESSSTREETNAME,
        properties.ADDRESSBUILDINGNAME,
        properties.ADDRESSFLOORNUMBER,
        properties.ADDRESSUNITNUMBER,
        properties.ADDRESSPOSTALCODE
      ]
        .filter(Boolean)
        .join(', ');

    return {
      name: properties.NAME || properties.Name || 'Unnamed',
      address: fullAddress || 'No address provided',
      type: properties.REUSETYPE ||'',
      items: properties.ACCEPTEDITEMS || '',
      description: properties.DESCRIPTION || 'No description',
      website: properties.HYPERLINK || '',
      location: geometry?.coordinates
        ? [geometry.coordinates[1], geometry.coordinates[0]]
        : null
    };
  });
};

class MapService{
    async retrieve(dataId, filters){
        const keyword = (filters || '').toLowerCase().trim();
        const datasetId = dataId || 'd_7e1f0da76a744c85e3d3ecc76642dcb5';

        const fetchedText = await fetchFromAPI(datasetId);
        const parsedData = JSON.parse(fetchedText);

        let formattedData = formatData(parsedData);

        if (keyword) {
        formattedData = formattedData.filter(point => {
            const searchable = `${point.name} ${point.description} ${point.address}`.toLowerCase();
            return searchable.includes(keyword);
        });
        }

        return formattedData
    }
}
export default new MapService()






{/*import{ fetchFromAPI } from '../utilities/api.js'


class MapService {
    formatData(data){
        if (!data.features) return []

        return data.features.map(feature =>{
            const { geometry, properties } = feature

            const fullAddress = 
            properties.FULLADDRESS || properties.ADDRESSSTREETNAME || 
            [
                properties.ADDRESSBLOCKHOUSENUMBER,
                properties.ADDRESSSTREETNAME,
                properties.ADDRESSBUILDINGNAME,
                properties.ADDRESSFLOORNUMBER,
                properties.ADDRESSUNITNUMBER,
                properties.ADDRESSPOSTALCODE
            ]
            .filter(Boolean)
            .join(',')

            return{
                name: properties.NAME || '',
                description: properties.DESCRIPTION || '',
                address: fullAddress,
                location: geometry
            }

        })
    }

    async retrieve(id, filters){
        const keyword = (filters || '').toLowerCase().trim()
        const datasetID = id || 'd_7e1f0da76a744c85e3d3ecc76642dcb5'

        const fetchedData = await fetchFromAPI(datasetID)
        const jsonData = JSON.parse(fetchedData)
        let formattedData = this.formatData(jsonData)

        if (keyword){
            formattedData = formattedData.filter(i => {
                const searchItem = `${i.name} ${i.description} ${i.address}`.toLowerCase()
                return searchItem.includes(keyword)
            })
        }
        return formattedData
    }


}
export default new MapService() */}