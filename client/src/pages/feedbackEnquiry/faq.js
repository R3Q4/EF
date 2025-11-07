import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar.js'
import { useNavigate } from 'react-router-dom'

const FAQ = () =>{
    const navigate = useNavigate()
    
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token')
            try {
                const fetching = await axios.get('http://localhost:5000/enquiry/faq', { headers: { Authorization: `Bearer ${token}` } })
                setData(fetching.data)
                
                } catch (err){
                    console.log("Error fetching Data")

            }
        }
        fetchData()
    }, [])

    return(
                
    <div className='flex min-h-screen'>

        <Sidebar />
        <div className='w-full h-full'>

            <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Frequently Asked Questions</p>
            <div className='m-10'>
            <div className="flex items-center space-x-3 px-2 py-2 rounded mb-10">
              <i className="material-symbols-outlined text-teal-500 text-5xl">help</i>
              <p className="font-bold text-teal-600 text-3xl">FAQ</p>
            </div>
            
            <div className = 'grid grid-cols-2 gap-4'>
                <button onClick ={() => navigate('/enquiry') } className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>Submit Enquiry/Feedback</button>
                <button className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>View Past Records</button>
            </div>

            <div className ='mb-6 p-6 m-10'>
                <p className='font-bold text-2xl text-teal-500 mb-10'>Questions commonly asked by users: </p>

            {data.map((item, i) => (
                <div key = {i} className = ''>   
                    <div className = 'bg-slate-100 p-4 mb-3'>
                        <p className='font-bold underline mb-4'><strong className='text-teal-700'>Question: </strong>{item.qn}</p>
                        <p className='mb-4'><strong className='text-teal-700'>Answer: </strong>{item.ans}</p>

                    </div>                    
                    
                </div>
            ))}

                </div>
            </div>

        </div>

    </div>            
    )
}

export default FAQ