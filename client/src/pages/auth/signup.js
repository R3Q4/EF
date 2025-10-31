import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Navbar from "../../components/Navbar"
import CheckPass from './checkPass'

function Signup(){
  const navigate = useNavigate()

  const [info, setInfo] = useState({email: '', password: ''})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  

    const handleChange = (e) =>{
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')

        try{
            const res = await axios.post('http://localhost:5000/auth/register', info)
            const retrieve = res.data.message;
            setMessage(retrieve)
            
            setTimeout(()=> navigate('/signup', {state: {email: info.email}}),2500)
        }
        catch (err){

            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error)
            } else {
                setError('Sign Up Failed. Please check your input and try again.')
                alert('Sign Up Failed Please try again')

            }
        }  finally {
          setLoading(false)
        }
    }

    return (
    <div className=''>
            <Navbar />
        <div className = 'min-h-screen flex flex-1 justify-center items-center'>
            <div>
                <div className='bg-gradient-to-b from-teal-500 to-cyan-400 p-10 shadow-xl border-2 border-gray-300 rounded-lg inline-block mt-5'>
                    <h1 className='text-3xl font-bold mb-2 text-white text-start'>Sign Up</h1>
                    <hr className='h-1 bg-white mb-4 border-0 '/>
                    <div>

                        <form onSubmit = { handleSubmit } className='space-y-4 text-base bg-white p-10 shadow rounded-xl inline-block max-w-sm'>
                        {error && <p className='break-words text-white bg-red-500 p-2 mt-3 text-center mb-3'>{error}</p>}

                            <div>
                                <label className='block text-left'><strong>Email</strong></label>
                                <input onChange = { handleChange } className='w-80 p-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' name = 'email' type='email' placeholder = 'Enter Your Email' required/>
                            </div>
                            <div>
                                <label className='block mb-1 text-left'><strong>Password</strong></label>
                                <input onChange = { handleChange } className='w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500' name = 'password' type='password' placeholder = 'Enter Your Password' required/>
                                <CheckPass password={info.password} />
                            </div>
                            <p className = 'text-center'>Have an account? <Link to ='/signin'><span className='text-blue-600'>Log in</span></Link> instead</p>
                            <button className ='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition' type="submit" disabled={loading}>{loading? 'Signing up...': 'Sign up'}</button>
                            {message && <p className='break-words text-green-600 bold mt-3 text-center'>{message}</p>}

                        </form>

                        
                    </div>
                </div>

            </div>

        </div>
    </div>
    )
}
export default Signup;