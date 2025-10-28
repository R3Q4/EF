import React, { useState, useRef } from 'react'
import Sidebar from "../../components/Sidebar"
import axios from 'axios'
import UserProfile from "./user.profile";

const Profile = () =>{
    const [transfer, setTransfer] = useState('')
    const refreshPage= useRef()


    const handleClick = (e) => {
        setTransfer(e)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
    }

    const [file, setFile] = useState()

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = () => {
        const formData = new FormData()
        formData.append('image', file)

        
        const token = localStorage.getItem('token')
        if (!token) {alert (
            'No Token Found. Please Login before using' )
            return
        }
        try{
        axios.post('http://localhost:5000/settings/pic',  formData , {headers: {Authorization: `Bearer ${token}`}})
        .then(res => console.log(res))

        if (refreshPage.current) {
            refreshPage.current().fetchProfile()}
        } catch (err){  
            console.error(err)
            alert('Error uploading profile picture' )
        }

    }



    return(
    <div className='flex min-h-screen mx-auto'>
        <Sidebar />

        <div className='w-full'>
            <div className=''>
                <h1 className='w-full bg-teal-500 border-b-2 border-gray-400 text-white px-8 py-6 shadow-md text-2xl font-extrabold tracking-wide'>Account Settings </h1>
            </div>

            {/* Body */}
            <div className='flex'>

                    {/* Display page */}
                    <div className='w-full flex justify-center items-center'>
                        <div className='p-4 bg-slate-200  rounded-lg'>
                            <UserProfile ref={refreshPage}/>
                            <input type="file" className='w-full mt-5' onChange={ handleFile } />
                            <button onClick={ handleUpload } className ='bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition mt-10' type="submit">Upload Profile Picture</button>
                        
                        </div>

                            <div className='p-10 '>
                                 <p className='font-bold text-3xl '>User Information</p>

                                <form  className='mt-5 p-10 bg-slate-200'>

                                    <div className='mb-6'>
                                        <label className='block mb-1 text-left'><strong>Username</strong></label>
                                        <input name='topic' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your username'></input>
                                    </div>


                                     <div className='mb-6'>
                                        <label className='block mb-1 text-left'><strong>Email</strong></label>
                                        <input name='topic' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your email'></input>
                                    </div>

                                     <div className='mb-6'>
                                        <label className='block mb-1 text-left'><strong>Password</strong></label>
                                        <input name='password' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your password'></input>
                                    </div>

                                    <button className ='w-full bg-teal-500 text-white mt-10 font-bold py-2 rounded hover:bg-teal-600 transition' type="submit">Save</button>

                                </form>
                            </div>
                    
                    </div>

                <div>

                    
                </div>

            </div>
        </div>

    </div>
    )
}
export default Profile;
