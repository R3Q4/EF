import React, { useState, useEffect } from 'react'
import axios from 'axios'


 import AllLocations from './datasets/location.dataset.js'
 import Search from './datasets/search.dataset.js'
 import AMap from './datasets/map.dataset.js'
 import Choose from './datasets/choose.dataset.js'
 import APopup from './datasets/popup.dataset.js'

function Map(){
  const [donationPoints,setDonationPoints] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [selectedDataset, setSelectedDataset] = useState('d_7e1f0da76a744c85e3d3ecc76642dcb5')
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const datasetOptions = [
    {
      id: 'd_7e1f0da76a744c85e3d3ecc76642dcb5',
      label: 'Donation/Repair/Resale Locations'
    },
    
    {
      id: 'd_db40d004afeb5a7f0f555fdcc34934cc',
      label: 'Recycling Points'
    }
  ]

  const fetchData = async (filters='', datasetId = selectedDataset) => {
    setLoading(true)
    setError(null)

    try{
      const params = new URLSearchParams()
      if (filters) params.append('filters', filters)
      if (datasetId) params.append('datasetId', datasetId)

      const response = await axios.get(`http://localhost:5000/map?${params.toString()}`)

      setDonationPoints(response.data)
    } catch(err){
        setError('Error Fetching Data from API')
    } finally{
        setLoading(false)
    }
  }      
  //
useEffect(() => {
    fetchData('', selectedDataset);
  }, [selectedDataset]);

  const defaultPosition = [1.3521, 103.8198];

  const openModal = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPoint(null);
  }

  return(
    <div className='h-full w-full'>
        <div className = ''>
          <h1 className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>3R Locations</h1>
          
          {/* Dataset information - filtering and displaying and map*/}
          <div className='m-10'>
            <Choose selectedDataset = { selectedDataset } setSelectedDataset = { setSelectedDataset } datasetOptions = {datasetOptions}/>
            <Search inputValue = {inputValue} setInputValue={setInputValue} onSearch ={(keyword) => fetchData(keyword, selectedDataset)}/>

            <div>
              <AMap donationPoints = { donationPoints } openModal = { openModal }/>
                    {loading && <p className='text-lg font-medium flex items-center justify-center min-h-screen text-[30px] font-bold' >Loading...</p>}
                    {error && <div className='flex items-center justify-center min-h-screen'><p className='text-lg font-medium flex items-center justify-center min-h-screen text-[30px] font-bold'>Something went wrong please try again</p></div>}
                    {!loading && !error && donationPoints.length ===0 && (<div className='col-span-full text-center py-10'><p className='col-span-full text-xl'>No Results Found</p></div>)}

            </div>

            <AllLocations donationPoints = { donationPoints } openModal = { openModal }/>
            <APopup showModal = { showModal} selectedPoint = { selectedPoint} closeModal = { closeModal }></APopup>
          </div>






        </div>

    </div>
  )

}
export default Map
