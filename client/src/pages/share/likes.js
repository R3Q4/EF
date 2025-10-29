import React, { useState } from 'react'
import axios from 'axios'

function Like({ postId, initiallyLiked = false}){
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

  return (
      <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        flex items-center justify-center 
        w-10 h-10 rounded-full 
        transition-all duration-300 transform mt-3
        ${liked ? 'bg-red-400 text-white scale-110' : 'bg-gray-200 text-gray-700 scale-100'}
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
      `}
    >
      <span className="material-symbols-outlined text-[24px]">
        favorite
      </span>
    </button>
  )
}
export default Like


