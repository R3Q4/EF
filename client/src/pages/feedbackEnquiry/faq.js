import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar.js'
import { useNavigate } from 'react-router-dom'

const FAQ = () =>{
    const navigate = useNavigate()
    
    return(
                
    <div className='flex min-h-screen'>

        <Sidebar />
        <div className='w-full h-full'>


            <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Enquiry/Feedback</p>
            <div className='m-10'>
            <div className = 'grid grid-cols-2 gap-4'>
                <button onClick ={() => navigate('/enquiry') } className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>Submit Enquiry/Feedback</button>
                <button className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>View Past Records</button>
            </div>

            <div className ='mb-6 p-6 m-10'>
                <p className='font-bold text-2xl text-teal-500 mb-10'>Frequently Asked Questions: </p>

                <div className='bg-slate-100 p-4'>
                    <p className='font-bold'>Question: </p>

                    <p>Answer: </p>
                </div>


                </div>
            </div>

        </div>

    </div>            
    )
}

export default FAQ