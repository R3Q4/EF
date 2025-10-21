import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Navbar from "../../components/Navbar"

function Signin(){
    const [info, setInfo] = useState({email: '', password: ''})
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:5000/auth/signin', info)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/welcome', {state: { message: res.data.message || 'Login Successful!'}}) 
        }
        catch (err){
            alert('Login Failed Please try again')
        }
    }
    return (
    <div className=''>
            <Navbar />
        <div className = 'min-h-screen flex flex-1 justify-center items-center'>
            <div className='bg-gradient-to-b from-teal-500 to-cyan-400 p-10 shadow-xl border-2 border-gray-300 rounded-lg inline-block'>
                <h1 className='text-3xl font-bold mb-2 text-white text-start'>Login</h1>
                <hr className='h-1 bg-white mb-4 border-0 '/>
                <div>

                    <form onSubmit = { handleSubmit } className='space-y-4 text-base bg-white p-10 shadow rounded-xl inline-block'>
                        <div>
                             <label className='block text-left'><strong>Email</strong></label>
                            <input onChange = { handleChange } className='w-80 p-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' name = 'email' type='email' placeholder = 'Enter Your Email' required/>
                        </div>
                        <div>
                            <label className='block mb-1 text-left'><strong>Password</strong></label>
                            <input onChange = { handleChange } className='w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500' name = 'password' type='password' placeholder = 'Enter Your Password' required/>
                        </div>
                        <div className='text-blue-600 text-center'>Forget Password? </div>
                        <button className ='w-full bg-teal-600 text-white font-bold py-2 hover:bg-teal-700 transition' type="submit">Login</button>
                    </form>

                    
                </div>
            </div>
        </div>
    </div>
    )
}
export default Signin;
