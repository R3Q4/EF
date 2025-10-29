import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/Sidebar"
import axios from 'axios'
import UserProfile from "./user.profile";

const Profile = () =>{
    const [transfer, setTransfer] = useState('')
    const [info, setInfo] = useState([])
    const [username, setUsername] = useState('')


    const handleChange= (e) => {
        setUsername(e.target.value)
    }

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

    useEffect(() => {
    const fetchPosts = async () => {
        const token = localStorage.getItem('token');

        if (!token) return

        try {
        const res = await axios.get('http://localhost:5000/settings/user', {
            headers: {  Authorization: `Bearer ${token}` },
        })
        setInfo(res.data)
        } catch (err) {
        console.error(err)
        }
    }
    fetchPosts()}, [])

    const handleUpload = () => {

        const token = localStorage.getItem('token')
        if (!token) {alert (
            'No Token Found. Please Login before using' )
            return
        }
        try{
        const res = axios.get('http://localhost:5000/settings/changeUsername', {username} , {headers: {Authorization: `Bearer ${token}`}})
        .then(res => console.log(res))
        setInfo(res)

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
                        <div className='p-10 ml-20 mr-20 w-full'>
                        <p className='font-bold text-3xl mb-10'>User Information</p>
                        <div className='p-4 bg-slate-200 flex flex-col rounded-lg'>
                            <div className='flex flex-col '>
                                 <p className='font-bold text-xl mb-5'>Profile Picture</p>

                                <UserProfile />
                                <input type="file" className='w-full mt-5' value= {info.username} onChange={ handleFile } />

                            </div>

                            <div className='flex justify-end'>
                                <button onClick={ handleUpload } className ='bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition mt-10' type="submit">Save</button>

                            </div>
                        </div>
                                <form  className='mt-5 p-10 bg-slate-200'>
                                    <p className='font-bold text-xl mb-5'>Account Information</p>

                                    <div className='mb-6'>
                                        <label className='block mb-1 text-left'><strong>Username</strong></label>
                                        <input id= "username" onChange = {handleChange} name='topic' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your username'></input>
                                        <ul id="username" class="border border-gray-300 bg-white mt-1 rounded-xl hidden absolute z-10 w-full">{info.username}</ul>
                                    </div>


                                     <div className='mb-6'>
                                        <label className='block mb-1 text-left'><strong>Email</strong></label>
                                        <input name='topic' className='w-full p-2 border border-gray-400 bg-gray-100 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your email'></input>
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
