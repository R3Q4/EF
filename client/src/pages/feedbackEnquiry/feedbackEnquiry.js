import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FeedbackEnquiry = () =>{
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [transfer, setTransfer] = useState('')
    const [enquiry, setEnquiry] = useState({
        category: '',
        topic: '',
        message: ''
    })
    const [status, setStatus] = useState(false)

    function handleSubmit(e){
        e.preventDefault()

        if (enquiry.message.length < 10){
            setError('Message must be minimally 10 characters long')
            return
        }

        const token = localStorage.getItem('token')
        if (!token) {alert (
            'No Token Found. Please Login before using' )
            return
            }

        console.log("Token being sent:", token);

        axios.post('http://localhost:5000/enquiry/upload', {
            category: enquiry.category,
            subject: enquiry.topic,
            message: enquiry.message
        }, {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            console.log(res.data);

            console.log(res)
            setStatus(true)
            setEnquiry({
                category: '',
                topic: '',
                message:''},
               
            )
            setTimeout(() => setStatus(false), 5000)

        }) .catch((err) => {
            console.log(err)
            setError('Enquiry Submission Failed. Please try again.')
        }
    )
    }

    const handleClick = (e) => {
        setTransfer(e)
     }

    const handleChange = (e) =>{
        setEnquiry((a) =>({
            ...a,
            [e.target.name]: e.target.value,
        }))
    }

    return(

    <div className='flex min-h-screen'>

        <Sidebar />
        <div className='w-full h-full'>
            <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Enquiry/Feedback</p>
            <div className ='mb-6 p-6'>
                {/* Navigate across pages */}
                <div className = 'grid grid-cols-2 mt-3 gap-4'>
                    <button className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>Submit Enquiry/Feedback</button>
                    <button onClick ={() => navigate('/viewEnquiry') } className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>View Past Records</button>
                </div>

                {error && <p className='mt-4 p-3 mb-3 bg-red-600 text-white font-semibold text-center'>{error}</p>}

                {status && <p className='mt-4 p-3 mb-3 bg-green-400 text-white font-semibold text-center'>Enquiry Sucessfully Submitted!</p>}
                        
                {/* Contents */}
                <div className='bg-slate-200 mt-5 '>

                        <form onSubmit = {handleSubmit} className='p-10 bg-slate-200'>

                            <div className='mb-6'>
                                <label className='block mb-1 text-left'><strong>Category</strong></label>
                                <input name='category' type='text' value ={enquiry.category} onChange={handleChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your topic'></input>
                            </div>


                            <div className='mb-6'>
                                <label className='block mb-1 text-left'><strong>Topic</strong></label>
                                <input name='topic' type='text' value ={enquiry.topic} onChange={handleChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your topic'></input>
                            </div>
                            
                            <div>
                                <label className='block mb-1 text-left'><strong>Message</strong></label>
                                <textarea name = 'message' type='text' value ={enquiry.message} onChange={handleChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'  rows='5' placeholder = 'Enter your message' required/>
                            </div>

                            <button className ='w-full bg-teal-500 text-white mt-10 font-bold py-2 rounded hover:bg-teal-600 transition' type="submit">Submit</button>

                        </form>
                        
                        <div className='flex align-center justify-end items-center m-5'>
                            <p className='text-gray-500'>FAQ</p>
                            <button onClick ={() => navigate('/faq') } className='px-4 py-2 h-10 w-10 font-bold gap-4 material-symbols-outlined'>help</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
    
    )}
export default FeedbackEnquiry