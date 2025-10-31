import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/Sidebar"
import axios from 'axios'
import UserProfile from "./user.profile";

const Profile = () =>{
    const [transfer, setTransfer] = useState('')
    const [info, setInfo] = useState('')
    const [username, setUsername] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')


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



    const handleUpload = async () => {
        const token = localStorage.getItem('token')
        if (!token) {alert (
            'No Token Found. Please Login before using' )
            return
        }
        const formData = new FormData()
        formData.append('image', file)

        try{
            const res = await axios.post('http://localhost:5000/settings/pic', formData , {headers: {Authorization: `Bearer ${token}`}})
            setInfo(res.data)
            setStatus('Profile picture updated! Refresh the page.')
        } catch (err){  
            console.error(err)
            alert('Error uploading profile picture' )
        }

    }

    useEffect(() => {
    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.get('http://localhost:5000/settings/retrieveUser', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsername(res.data.username || '');
            setGender(res.data.gender || '');
        } catch (err) {
            console.error('Failed to fetch user info:', err);
        }
    };

    fetchUserInfo();
    }, [])

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) return alert('No token found');

        try {
            const res = await axios.put(
                'http://localhost:5000/settings/updateUser', 
                { username, gender },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('User info updated successfully!');
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            console.error(err);
            alert('Failed to update user info');
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
            <div className='flex justify-center items-center min-h-screen bg-gray-50'>

                    {/* Display page */}
                    <div className='w-full flex justify-center items-center'>
                        <div className='p-10 ml-10 mr-10 w-full'>

                            {/*Header */}
                            <div className='text-center'>
                                <p className='font-bold text-4xl mb-5'>User Information</p>
                                <p className='font-bold text-gray-500 mb-10'>Manage your account settings</p>
                                {status &&
                                    <div className='text-green-500 font-bold text-center'>{status}</div>
                                }
                            </div>

                            {/*User info */}
                            <div className="bg-gray-300 rounded-lg p-8 flex flex-col items-center text-center">
                                <UserProfile />

                                <h2 className="font-bold text-3xl text-teal-00 mt-6 mb-3">{username}</h2>

                                <div className="mt-6 w-full max-w-sm">
                                    <p className="text-gray-600 font-medium mb-2 text-lg">Profile Picture</p>
                                    <div>
                                        <input type="file" onChange={handleFile}
                                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold 
                                                file:bg-teal-500 file:text-white hover:file:bg-teal-600 
                                                cursor-pointer border border-gray-200 rounded-md p-1 border-2 bg-white"/>
                                        <button onClick = {handleUpload} className ='w-full bg-teal-500 text-white mt-3 font-bold py-2 rounded hover:bg-teal-600 transition' type="submit">Upload</button>

                                    </div>

                                </div>
                                

                                <div className="mt-6 w-full max-w-sm">
                                    <p className="text-gray-600 font-medium mb-2 text-lg">Username</p>
                                    <input id= "username" name='topic' value= {username} onChange={(e) => setUsername(e.target.value)} 
                                    className='w-full p-2 border shadow-inner border-gray-400 bg-white rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your username'></input>

                                </div>

                                <div className="mt-6 w-full max-w-sm">
                                    <p className="text-gray-600 font-medium mb-2 text-lg">Gender</p>
                                    <input name='topic' value={gender} onChange={(e) => setGender(e.target.value)}
                                    className='w-full p-2 border shadow-inner border-gray-400 bg-white rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your gender'></input>

                                    <button onClick = {handleUpdate} className ='mt-12 w-full bg-teal-500 text-white mt-3 font-bold py-2 rounded hover:bg-teal-600 transition' type="submit">Update</button>
                                </div>


                            </div>

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
