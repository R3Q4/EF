import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'

import AllLocations from './location.dataset.js'
import Search from './search.dataset.js'
import AMap from './map.dataset.js'
import Choose from './choose.dataset.js'
import APopup from './popup.dataset.js'
import Category from './userFilter.dataset'


function Nearest(){
  const [donationPoints,setDonationPoints] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [datasetId, setDatasetId] = useState('d_7e1f0da76a744c85e3d3ecc76642dcb5')
  const [limit, setLimit] = useState(3)
  const [address, setAddress] = useState('')
  const [filters, setFilters] = useState('')

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

  const fetchData = async () => {
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
      if (limit) params.append('limit', limit)
      if (address) params.append('address', address)

        const response = await axios.get(`http://localhost:5000/map/nearest?${params.toString()}`)
        setDonationPoints(response.data)
    } catch(err){
        setError('Error Fetching Data from API')
    } finally{
        setLoading(false)
    }
  }

  useEffect(() => {
      fetchData('', datasetId)
    }, [datasetId, category])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchData()
  }
  
  const openModal = (point) =>{
    setSelectedPoint(point)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPoint(null)
  }
  const currentCategories =
    datasetOptions.find(d => d.id === datasetId)?.category || []

  return(
    <div className='min-h-screen flex'>
        <Sidebar />
        <div className='h-full w-full'>
            <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Determine Your Nearest Recycling Point</p>            

            <div className = 'p-4'>
            <div className="group cursor-pointer inline-block w-full">
              <div className="flex items-center space-x-3 mt-6">
                <i className="material-symbols-outlined text-teal-500 text-5xl">search</i>
                <p className="font-bold text-teal-600 text-3xl m-0">Find Location</p>
              </div>

              <p className="font-bold text-gray-500 max-h-0 overflow-hidden transition-all duration-300 mt-2 group-hover:max-h-40">
                Find locations where you can donate, repair, resell, recycle! Toggle between recycling points and donation locations. Filter based on your preference.
              </p>
            </div>

                <Choose selectedDataset = { datasetId } setSelectedDataset = { setDatasetId } datasetOptions = {datasetOptions}/>
                <Category currentCategories = {currentCategories} category = {category} setCategory = {setCategory}/>
                
                <Search inputValue = {filters} setInputValue={setFilters} onSearch ={(keyword) => fetchData(keyword, datasetId)}/>
                
              <div className="group cursor-pointer w-full mb-6">
                {/* Form header */}
                <p className="font-bold text-gray-500 max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-40 mb-2">
                  Find the nearest recycling location around you by keying in your current location
                </p>
                <form className='mb-4 flex flex-col justify-center text-center align-center gap-3 bg-teal-100 p-4 rounded-2xl' onSubmit ={handleSearch}>
                    <div className='flex gap-3 w-full '>
                        <p className='font-bold'> Current Location</p><input type='text' className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400' value = {address} placeholder = "Enter your address" onChange = {(e) => setAddress(e.target.value)}></input>
                        <p className='font-bold'>Number of Nearest Locations</p><input type='number' min='1' placeholder='Limit' value = {limit} onChange = {(e) => setLimit(e.target.value)} className='w-28 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
                    </div>
                    <button type= 'submit' className='w-full w-auto px-6 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600'>Find</button>
                </form>
              </div>

                <div>
                    <AMap donationPoints = { donationPoints } openModal = { openModal }/>
                        {loading && <p className='text-lg font-medium flex items-center justify-center min-h-screen text-[30px] font-bold' >Loading...</p>}
                        {error && <div className='flex items-center justify-center min-h-screen'><p className='text-lg font-medium flex items-center justify-center min-h-screen text-[30px] font-bold'>Something went wrong please try again</p></div>}
                        {!loading && !error && donationPoints.length ===0 && (<div className='col-span-full text-center py-10'><p className='col-span-full text-xl'>No Results Found</p></div>)}

                </div>
                


                <AllLocations donationPoints = { donationPoints } openModal = { openModal }/>
                <APopup showModal = { showModal } selectedPoint = { selectedPoint} closeModal = { closeModal }></APopup>


            </div>


        </div>
    </div>
  )

}
export default Nearest
