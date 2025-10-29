import React from 'react'
import axios from 'axios'

export default function DeleteShare ({postId, token}) {
    const handleDelete = async () =>{
    try {
        await axios.delete(`http://localhost:5000/share/delete?post_id=${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Post deleted successfully')
    }
    catch (err) {
        console.error('Error deleting post:', err)
        }
    }
    return(
        <div>
            <button onClick = {handleDelete} className='px-4 py-2 mt-2 rounded-full text-white bg-red-400 hover: bg-red-500'>Delete</button>
        </div>
    )
}