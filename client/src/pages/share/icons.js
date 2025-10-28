import React, { useState } from 'react'
import axios from 'axios'

function Comment({ postId, initiallyLiked = false}){
    const [liked, setLiked] = useState(initiallyLiked)
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('token')

    const handleToggle = async () => {
        if (!token|| loading) return
        setLiked(!liked)
        setLoading(true)

        try {
            const url = liked
            ? `http://localhost:5000/share/unlike?post_id=${postId}`
            : `http://localhost:5000/share/like?post_id=${postId}`
            await axios.post(
                url,
                { post_id: postId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch(err){
            console.error("Error toggling like:", err)
            setLiked(liked)
        } finally {
            setLoading(false)
        }

    }


    return(
<button
  onClick={handleToggle}
  disabled={loading}  
  style={{
    backgroundColor: bgColor,
    color: textColor,
    transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
    transform: liked ? 'scale(1.2)' : 'scale(1)',}}
  className={`p-3 rounded-full material-symbols-outlined ${ loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`}
>favorite</button>
    )
}
export default Like


