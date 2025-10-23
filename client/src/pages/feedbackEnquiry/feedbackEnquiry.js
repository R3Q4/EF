import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar.js'

const FeedbackEnquiry = () =>{
    const[submit, setSubmitted] = useState('')
    const [enquiry, setEnquiry] = useState({
        topic: '',
        message:''
    })

    const [transfer, setTransfer] = useState('')
    
    
    const handleClick = (e) => {
        setTransfer(e)
     }
    
    const [data, setData] = useState(null)

    const handleInputChange = (e) =>{
        setEnquiry((a) =>({
            ...a,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit =(e) =>{
        e.preventDefault();
        setData(enquiry)
        setSubmitted('Successfully submitted')
        setEnquiry({topic:'', email:'',message:''})

    }

    const [dropdown, setDropdown] = useState('')
    const handleSelectChange = (e) =>{
        setDropdown(e.target.value)
    }
    
    const handleSelectSubmit = (e) =>{
        e.preventDefault();
    }
    
    const[reply, setReply] = useState('')
    const[replyState, setReplyState] = useState(false)

    const handleClickReply =(e) =>{
        setReplyState(!replyState)
    }

    const[clearState, setClearState] = useState(true)

    const handleClickClear =(e) =>{
        setClearState(false)
    }


    return(

    <div className='flex min-h-screen'>

        <Sidebar />
        <div className='w-full h-full'>
            <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Enquiry/Feedback</p>
            <div className ='mb-6 p-6'>
                {/* Navigate across pages */}
                <div className = 'grid grid-cols-2 mt-3 gap-4'>
                    <button onClick ={() => handleClick('enquiry') } className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>Submit Enquiry/Feedback</button>
                    <button onClick ={() => handleClick('view') } className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>View Past Records</button>
                </div>
                        
                {/* Contents */}
                <div className='bg-gray-100 mt-5 '>
                    {(transfer === 'enquiry'|| transfer==='') && 
                    <div>
                        <form onSubmit = {handleSubmit} className='p-10 bg-slate-200'>

                            <div className='mb-6'>
                                <label className='text-left mb-1'><strong>Enquiry Type</strong></label>
                                <select name='dropdown' value={dropdown} onChange={handleSelectChange} className='w-full border border-gray-400 rounded-xl bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 text-black'>
                                    <option>Enquiry</option>
                                    <option>Feedback (no response) </option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className='mb-6'>
                                <label className='block mb-1 text-left'><strong>Topic</strong></label>
                                <input name='topic' value ={enquiry.topic} onChange={handleInputChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your topic'></input>
                            </div>
                            
                            <div>
                                <label className='block mb-1 text-left'><strong>Message</strong></label>
                                <textarea name = 'message' value ={enquiry.message} onChange={handleInputChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' rows='5' placeholder = 'Enter your message' required/>
                            </div>

                            <button className ='w-full bg-teal-500 text-white mt-10 font-bold py-2 rounded hover:bg-teal-600 transition' type="submit">Submit</button>

                        </form>
                    </div>
                    }
                    {transfer === 'view' && 
                    <div>
                        <div className='bg-slate-500 p-6 rounded-xl'>
                            <p className='font-bold text-gray-200 underline mb-4'>Enquiry ID: </p>
                            <p className='font-bold text-gray-200'>Enquiry Status: </p>

                            <p className='font-bold text-gray-200'>Enquiry: </p>

                            <p className='font-bold text-gray-200'>Response: </p>
                            <div className='flex justify-end space-x-10'>
                                <button onClick = {handleClickReply} className='text-white font-bold py-2 rounded hover:bg-green-700 transition bg-green-800 p-4 rounded-3xl'>Reply</button>

                                <button onClick = { handleClickClear } className='text-white font-bold py-2 rounded hover:bg-red-700 transition bg-red-800 p-4 rounded-3xl '>Clear</button>
                            </div>

                        </div>
                    </div>
                    }

                </div>
            </div>

        </div>

    </div>
    
    )}
export default FeedbackEnquiry





    {/*





        
                <h1 className='w-full bg-teal-700 border-b-2 border-gray-400 text-white px-8 py-6 shadow-md text-2xl font-extrabold tracking-wide'>Enquiry / Feedback</h1>
                <div className="bg-slate-600 border-2 border-gray-300 shadow-lg m-10">
                    <h1 className='text-3xl font-bold text-white text-start p-6 ml-4'>Enquiry / Feedback Form</h1>
                    <div>
                        <form onSubmit = {handleSubmit} className='p-10 bg-slate-200'>
                            <div className='mb-6'>
                                <label className='text-left mb-1'><strong>Enquiry Type</strong></label>
                                <select name='dropdown' value={dropdown} onChange={handleSelectChange} className='w-full border border-gray-400 rounded-xl bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 text-black'>
                                    <option>Enquiry</option>
                                    <option>Feedback (no response) </option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className='mb-6'>
                                <label className='block mb-1 text-left'><strong>Topic</strong></label>
                                <input name='topic' value ={enquiry.topic} onChange={handleInputChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your topic'></input>
                            </div>
                            
                            <div>
                                <label className='block mb-1 text-left'><strong>Message</strong></label>
                                <textarea name = 'message' value ={enquiry.message} onChange={handleInputChange} className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' rows='5' placeholder = 'Enter your message' required/>
                            </div>

                            <button className ='w-full bg-gradient-to-b from-slate-600 to-slate-800 text-white mt-10 font-bold py-2 rounded hover:bg-blue-700 transition' type="submit">Submit</button>
                    
                        {submit && (
                        <div className='p-6'>
                            <div className='mt-6 p-4 bg-green-200 border border-green-300 rounded-md'> 
                            <p className='text-green-800 text-center font-bold underline'>{submit}</p>
                            <p className='text-green-800'>Type: {dropdown}</p>
                            <p className='text-green-800'>Topic: {data.topic}</p>
                            <p className='text-green-800 '>Message: {data.message}</p>

                            </div>
                        </div>
                        )}
                        </form>
                        <h1 className='text-3xl font-bold text-white text-start p-6 ml-4'>Responses</h1>
                        

                    </div>

                    {clearState && 
                    <div className=' bg-slate-200 p-10 shadow-xl border-gray-200 rounded-lg'>
                        <div className='bg-slate-500 p-6 rounded-xl'>
                            <p className='font-bold text-gray-200 underline mb-4'>Enquiry ID: </p>
                            <p className='font-bold text-gray-200'>Enquiry: </p>

                            <p className='font-bold text-gray-200'>Response: </p>
                            <div className='flex justify-end space-x-10'>
                                <button onClick = {handleClickReply} className='text-white font-bold py-2 rounded hover:bg-green-700 transition bg-green-800 p-4 rounded-3xl'>Reply</button>
                                <button onClick = { handleClickClear } className='text-white font-bold py-2 rounded hover:bg-red-700 transition bg-red-800 p-4 rounded-3xl '>Clear</button>
                            </div>

                        </div>
                    {replyState && (
                        <div>
                            <div className='flex space-x-6'>
                                <input className='flex-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mt-4' type='text' placeholder = 'Your Message' required/>
                                
                            </div>
                                <button className='text-white font-bold py-2 rounded hover:bg-green-700 transition bg-green-800 p-4 rounded-3xl mt-4 flex justify'>Reply</button>

                        </div>
                    )}

                    </div>
                    }


            
                </div>

            </div>    
             

    */}