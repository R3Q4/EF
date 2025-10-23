import React, { useState } from 'react'
import Sidebar from "../components/Sidebar"
import { Link } from 'react-router-dom';

const Profile = () =>{
    const [transfer, setTransfer] = useState('')


    const handleClick = (e) => {
        setTransfer(e)
    }





    return(
    <div className='flex min-h-screen mx-auto'>
        <Sidebar />

        <div className='w-full'>
            <div className=''>
                <h1 className='w-full bg-teal-800 border-b-2 border-gray-400 text-white px-8 py-6 shadow-md text-2xl font-extrabold tracking-wide'>Account </h1>
            </div>

            {/* Body */}
            <div className='flex'>

                {/* Navigator */}
                <div className = 'w-1/4 space-y-2 p-4 bg-sky-100 min-h-screen'>
                    <div className='flex mb-7'>
                        <Link to ='/' className='flex items-center space-x-3 px-2 py-2 text-[22px] font-extrabold rounded hover:bg-cyan-200 transition'>
                            <i className='material-symbols-outlined'>arrow_left</i>
                            <p classsName=''>Back</p>
                        </Link>
                    </div>
                        <div className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-cyan-200 transition'>
                            <i className='material-symbols-outlined'>home</i>
                            <button onClick ={() => handleClick('enquiry') }>Enquiry/Feedback </button>
                        </div>

                        <div className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-cyan-200 transition'>
                            <i className='material-symbols-outlined'>home</i>
                            <button onClick ={() => handleClick('accSettings') }>Account Settings</button>
                        </div> 
                    </div>

                    {/* Display page */}
                    <div className='w-full'>
                        {transfer === 'enquiry' && 
                            <div className='p-10 '>
                                <form  className='mt-5 p-10 bg-slate-200'>

                                    <div className='mb-6'>
                                        <label className='text-left mb-1'><strong>Enquiry Type</strong></label>
                                        <select name='dropdown' className='w-full border border-gray-400 rounded-xl bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 text-black'>
                                            <option>Enquiry</option>
                                            <option>Feedback (no response) </option>
                                            <option>Others</option>
                                        </select>
                                    </div>

                                    <div className='mb-6'>
                                        <label className='block mb-1 text-left'><strong>Topic</strong></label>
                                        <input name='topic' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your topic'></input>
                                    </div>
                                    
                                    <div>
                                        <label className='block mb-1 text-left'><strong>Message</strong></label>
                                        <textarea name = 'message' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' rows='5' placeholder = 'Enter your message' required/>
                                    </div>

                                    <button className ='w-full bg-teal-500 text-white mt-10 font-bold py-2 rounded hover:bg-teal-600 transition' type="submit">Submit</button>

                                </form>
                            </div>
                    }
                    </div>




                {/* Account Settings */}
                <div>
                    
                </div>

            </div>
        </div>

    </div>
    )
}
export default Profile;
