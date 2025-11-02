import React, { useState } from 'react'
import axios from 'axios'

export default function DeleteShare ({postId, token}) {
    const [popup, setPopup] = useState(false)
    const [status, setStatus] = useState('')

    const handleDelete = async () =>{
    setPopup(false)
    try {
        await axios.delete(`http://localhost:5000/share/delete?post_id=${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Post deleted successfully.')
        setPopup(true)
        setStatus('Post deleted successfully. Please Refresh. ')
    }
    catch (err) {
        console.error('Error deleting post:', err)
        setPopup(true)
        setStatus('Error Deleting post. Please Refresh. ')
        }
    }
    return(
        <div>
            <button onClick = {handleDelete} className='px-4 py-2 mt-2 rounded-full text-white bg-red-400 hover: bg-red-500'>Delete</button>
            {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-800 mb-4 font-medium">{status}</p>
            <button
              onClick={() => setPopup(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
        </div>
    )
}