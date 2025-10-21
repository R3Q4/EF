import React, { useState, useEffect } from 'react'
import axios from 'axios'

const What = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const fetching = await axios.get('http://localhost:5000/homepage/what')
                setData(fetching.data)
                
                } catch (err){
                    console.log("Error fetching Data")

            }
        }
        fetchData()
    }, [])


    return(
        <div className='min-h-screen'>
            <p className='mb-8 mt-4 font-bold text-[20px]'>Do you know what can be placed in these blue recycling bins?</p>
            <div className = ' grid grid-cols-3 gap-3'>
                
            {/* Recyclable Materials by Materials */} 
            {data.map((item, i) => (
                <div
                    key = {i} className = 'relative w-[340px] h-[310px] bg-black border text-center shadow rounded-lg mb-5'
                >   <a href= 'https://www.nea.gov.sg/docs/default-source/our-services/waste-management/list-of-items-that-are-recyclable-and-not.pdf'  target="__blank">
                    <img
                        src = {`https://images.unsplash.com/${item.url}`}
                        alt = {item.category} 
                        className = 'opacity-60 absolute inset-0 w-full h-full '
                    />


                    <div className = 'p-3 absolute inset-0 flex flex-col items-center justify-center'>
                        <p className='text-3xl text-white font-bold mb-4'>{item.category}</p>

                        { item.recyclable && (
                            <div>
                                <p className='text-white'><span className='text-green-400 font-extrabold text-lg'>OK: </span>{item.recyclable} bags</p>    
                                <br/>
                            </div>
                        )}
                        <p className='text-white'><span className='text-red-400 font-extrabold text-lg'>NO: </span>{item.non_recyclable}</p>    
                    </div>                    
                    </a>
                </div>
            ))}

            </div>

        </div>
    )
}
export default What

