export const fetchFromAPI = async (dataset_ID) => {
    const url = "https://api-open.data.gov.sg/v1/public/api/datasets/" + dataset_ID + "/poll-download"

    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch poll-download data')
        }

        const jsonData = await response.json()
        if (jsonData['code'] != 0) {
            throw new Error(jsonData['errMsg'])
        }

        const fetchUrl = jsonData['data']['url']
        response = await fetch(fetchUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch inner data')
        }

        const data = await response.text()
        return data
    } catch (err) {
        throw err
    }
} 


const dataset_ID = "d_72f8e05d45477a7af0c089ad970519da";

fetchFromAPI(dataset_ID)
    .then(data => {
        console.log("Data fetched successfully:");
        console.log(data

        );
        console.log(typeof(data)

        );
    })
    .catch(err => {
        console.error("Error:", err.message);
    });