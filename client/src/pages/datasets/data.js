import React, { useState, useEffect } from 'react'
import axios from 'axios'


 import AllLocations from './location.dataset.js'
 import Search from './search.dataset.js'
 import AMap from './map.dataset.js'
 import Choose from './choose.dataset.js'
 import APopup from './popup.dataset.js'
 import Category from './userFilter.dataset'

function Map(){
  const [donationPoints,setDonationPoints] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [selectedDataset, setSelectedDataset] = useState('d_7e1f0da76a744c85e3d3ecc76642dcb5')
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState('all')

  const datasetOptions = [
    {
      id: 'd_7e1f0da76a744c85e3d3ecc76642dcb5',
      label: 'Donation/Repair/Resale Locations',
      category: [`Appliances`, `Baby`,`Bags`, `Books`, `children`, `Clothing`, `Furniture`, `Household`,`ICT`,
      `Shoes`,
      `Stationery`,
      `Toys`]
    },
    
    {
      id: 'd_db40d004afeb5a7f0f555fdcc34934cc',
      label: 'Recycling Points',
      category: ['Appliances', 'Audio', 'Batteries', 'Devices', 'gaming ',  'ICT', 'Lamps','Power']
    }
  ]

  const fetchData = async (filters='', datasetId = selectedDataset) => {
    setLoading(true)
    setError(null)

    try{
      const params = new URLSearchParams()
      let combinedFilters = filters

    // combine search term + category
    if (category && category !== 'all') {
      combinedFilters = combinedFilters
        ? `${combinedFilters} ${category}` 
        : category
    }

      if (combinedFilters) params.append('filters', combinedFilters)
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
  }, [selectedDataset, category]);

  const defaultPosition = [1.3521, 103.8198];

  const openModal = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPoint(null);
  }

  const currentCategories =
    datasetOptions.find(d => d.id === selectedDataset)?.category || []

  return(
    <div className='h-full w-full'>
        <div className = ''>
          <h1 className='w-full bg-teal-400 text-gray-100 font-extrabold px-8 py-6 text-[24px] shadow-lg border border-teal-500'>3R Locations</h1>
          
          {/* Dataset information - filtering and displaying and map*/}
          <div className='m-10'>
            <Choose selectedDataset = { selectedDataset } setSelectedDataset = { setSelectedDataset } datasetOptions = {datasetOptions}/>
            <Category currentCategories = {currentCategories} category = {category} setCategory = {setCategory}/>
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
