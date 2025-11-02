import { fetchFromAPI } from "../utilities/api.js"

const formatData = (rawData) => {
  if (!rawData.features) return [];

  return rawData.features.map(feature => {
    const { geometry, properties } = feature;

    const fullAddress =
      properties.FULLADDRESS || // REPAIR DONATE RESALE
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
const nearestFinderAlgo = (coord1, coord2) => {
  const toRad = x => (x * Math.PI) / 180;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}
class MapService{
    async retrieve(dataId, filters){
        const keyword = (filters || '').toLowerCase().trim();
        const datasetId = dataId || 'd_7e1f0da76a744c85e3d3ecc76642dcb5'

        const fetchedText = await fetchFromAPI(datasetId);
        const parsedData = JSON.parse(fetchedText);

        let formattedData = formatData(parsedData);

if (keyword) {
    const keywords = keyword.split(/\s+/).filter(Boolean); // split by spaces
    formattedData = formattedData.filter(point => {
      const searchable = [
        point.name,
        point.description,
        point.address,
        point.items
      ]
        .join(' ')
        .toLowerCase();

      // Match if ANY of the keywords exist in searchable text
      return keywords.some(k => searchable.includes(k));
    });
  }

  return formattedData;
}

  async nearest(datasetId, address, filters, limit) {
    if (!address) return this.retrieve(datasetId, filters);

    const addrFinder = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`,
      { headers: { "User-Agent": "Node.js Server" } }
    );

    const data = await addrFinder.json();

    if (!data.length) {
      throw new Error("Address not found");
    }

    const latitude = parseFloat(data[0].lat);
    const longitude = parseFloat(data[0].lon);

    const points = await this.retrieve(datasetId, filters);

    if (!points.length) {
      throw new Error("No locations found");
    }

    const results = points
      .filter((p) => p.location)
      .map((p) => {
        const dist = nearestFinderAlgo([latitude, longitude], p.location);
        return { ...p, distance_km: parseFloat(dist.toFixed(2)) };
      });

    const sorted = results.sort((a, b) => a.distance_km - b.distance_km);
    const limits = Math.max(1, parseInt(limit) || 3);

    return sorted.slice(0, limits);
    }
}
export default new MapService()




