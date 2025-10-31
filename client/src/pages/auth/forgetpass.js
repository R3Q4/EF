import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import Navbar from "../../components/Navbar"

export default function Forget() {

    const [info, setInfo] = useState({email: ''})
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:5000/auth/forget', info)
            const retrieve = res.data.message
            setMessage(retrieve)
            
            setTimeout(()=> navigate('/signin', {state: {email: info.email}}),2500)


        }
        catch (err){
            alert('Reset password failed. Please try again')
        }
    }

    return (
    <div className=''>
        <Navbar />
        <div className = 'min-h-screen flex flex-1 justify-center items-center'>
            <div className='bg-gradient-to-b from-teal-500 to-cyan-400 p-10 shadow-xl border-2 border-gray-300 rounded-lg inline-block'>
                <h1 className='text-3xl font-bold mb-2 text-white text-start'>Forget Password</h1>
                <hr className='h-1 bg-white mb-4 border-0 '/>
                <div>
                    <form onSubmit = { handleSubmit } className='space-y-4 text-base bg-white p-10 shadow rounded-xl inline-block'>
                        <div>
                             <label className='block text-left'><strong>Email</strong></label>
                            <input onChange = { handleChange } className='w-80 p-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' name = 'email' type='email' placeholder = 'Enter Your Email' required/>
                        </div>

                        <button className ='w-full bg-teal-600 text-white font-bold py-2 hover:bg-teal-700 transition' type="submit">Change Password</button>
                    </form>
                    {message && 
                        <div className='text-green-500 font-bold text-center'>{message}</div>
                    }

                    
                </div>
            </div>
        </div>
    </div>
    )
}