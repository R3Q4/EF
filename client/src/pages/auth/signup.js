import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Navbar from "../../components/Navbar"

function Signup(){
    const [info, setInfo] = useState({email: '', password: ''})
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:5000/auth/signup', info)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/homepage', {state: { message: res.data.message || 'Signup Successful!'}}) 
        }
        catch (err){
            alert('Sign Up Failed Please try again')
        }
    }

    return (
    <div className='min-h-screen'>
        <Navbar />
        <div className = 'flex vh-75 justify-center items-center mt-10'>
            <div className='bg-gradient-to-b from-teal-500 to-cyan-400 p-10 shadow rounded-lg inline-block'>
                <h1 className='text-3xl font-bold mb-2 text-white text-start'>Sign Up</h1>
                <hr className='h-1 bg-white border-0 mb-4'></hr>
                <div className='bg-white shadow-xl p-6'>
                    <form onSubmit = { handleSubmit } className='space-y-2 text-base'>
{/*                      <div>
                            <label className='block mb-1 text-left'><strong>Username</strong></label>
                            <input className='w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' name='username' type='text' placeholder = 'Enter Your Username' required/>
                        </div> */}

                        <div>
                            <label className='block mb-1 text-left'><strong>Email</strong></label>
                            <input onChange={ handleChange } className='w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' name='email' type='email' placeholder = 'Enter Your Email' required/>
                        </div>


                        <div>
                            <label className='block mb-1 text-left'><strong>Password</strong></label>
                            <input onChange={ handleChange } className='w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' name='password' type='password' placeholder = 'Enter Your Password' required/>
                        </div>
                       
                        <p className = 'text-center'>Have an account? <Link to ='/signin'><span className='text-blue-600'>Log in</span></Link> instead</p>
                        <button className ='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition' type="submit">Sign Up</button>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
    )
}
export default Signup;
