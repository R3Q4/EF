import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function ResetNew() {
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Extract token from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const t = params.get('token')
    if (t) setToken(t)
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPass !== confirmPass) {
      setStatus('mismatch')
      return
    }

    try {
      await axios.post(`http://localhost:5000/auth/reset?token=${token}`, { newPass })
      setStatus('success')
      setTimeout(() => navigate('/signin'), 2500)
    } catch (err) {
      console.error(err)
      setStatus('fail')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-1 justify-center items-center">
        <div>
            {status === 'success' && (
            <div className="text-green-500 font-bold text-center mt-4">
              ✅ Password successfully changed! Redirecting...
            </div>)}
          {status === 'fail' && (
            <div className="text-red-500 font-bold text-center mt-4">
              ❌ Password reset failed. Try again.
            </div>)}
          {status === 'mismatch' && (
            <div className="text-red-500 font-bold text-center mt-4">
              ⚠️ Passwords do not match!
            </div>)}
        <div className="bg-gradient-to-b from-teal-500 to-cyan-400 p-10 shadow-xl border-2 border-gray-300 rounded-lg inline-block mt-5">
          <h1 className="text-3xl font-bold mb-2 text-white text-start">Set New Password</h1>
          <hr className="h-1 bg-white mb-4 border-0" />

          <form onSubmit={handleSubmit} className="space-y-4 text-base bg-white p-10 shadow rounded-xl inline-block">
            <div>
              <label className="block text-left"><strong>New Password</strong></label>
              <input
                onChange={(e) => setNewPass(e.target.value)}
                name="newPass"
                type="password"
                placeholder="Enter new password"
                required
                className="w-80 p-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-left"><strong>Confirm New Password</strong></label>
              <input
                onChange={(e) => setConfirmPass(e.target.value)}
                name="confirmPass"
                type="password"
                placeholder="Confirm new password"
                required
                className="w-80 p-2 border border-gray-300 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="w-full bg-teal-600 text-white font-bold py-2 hover:bg-teal-700 transition"
              type="submit"
            >
              Update Password
            </button>
          </form>
        </div>

        </div>
      </div>
    </div>
  )
}
