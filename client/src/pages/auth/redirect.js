import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Navbar from '../../components/Navbar'

export default function Redirect(){
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')
    const location = useLocation()


useEffect(() => {
  const params = new URLSearchParams(location.search);
  const statusParam = params.get("status");
  const messageParam = params.get("message");

  setStatus(statusParam === "success");
  setMessage(messageParam || "");
}, [location.search]);


  return(
    <div>
      <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="bg-white p-10 rounded-2xl shadow-lg max-w-sm w-full text-center">
            
            {/* Icon */}
            <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-6
                            ${status ? "bg-green-100" : "bg-red-100"}`}>
              <span className={`text-3xl ${status ? "text-green-600" : "text-red-600"}`}>
                {status ? "✔️" : "❌"}
              </span>
            </div>

            {/* Heading */}
            <h2 className={`text-2xl font-bold mb-3 ${status ? "text-green-600" : "text-red-600"}`}>
              {status ? "Sign Up Successful!" : "Oops! Something went wrong. Please try again."}
            </h2>

            {/* Message */}
            <p className="text-gray-700 mb-6">{message}</p>

            {/* Button / Link */}
            <a
              href="/signin"
              className={`inline-block w-full py-3 rounded-lg font-semibold
                          ${status ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}
                          transition-colors`}
            >
              Go to Login
            </a>
          </div>
        </div>

    </div>

  )
}

