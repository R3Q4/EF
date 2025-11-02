import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Like({ postId, initiallyLiked = false }) {
  const [liked, setLiked] = useState(initiallyLiked)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  const token = localStorage.getItem('token') // get token once

  // Fetch like count on mount
  useEffect(() => {
    const fetchLikeCount = async () => {
      if (!token) return // user not logged in, skip
      try {
        const response = await axios.get(
          `http://localhost:5000/share/likeCount?post_id=${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // include token
            },
          }
        )
        setCount(Number(response.data.count) || 0) // ensure it's a number
      } catch (err) {
        console.error('Error fetching like count:', err)
      }
    }
    fetchLikeCount()
  }, [postId, token])

  const handleToggle = async () => {
    if (!token || loading) return

    const wasLiked = liked
    setLiked(!liked)
    setCount(prev => prev + (wasLiked ? -1 : 1))
    setLoading(true)

    try {
      const url = wasLiked
        ? `http://localhost:5000/share/unlike?post_id=${postId}`
        : `http://localhost:5000/share/like?post_id=${postId}`

      await axios.post(
        url,
        { post_id: postId },
        {
          headers: { Authorization: `Bearer ${token}` }, // include token
        }
      )
    } catch (err) {
      console.error('Error toggling like:', err)
      setLiked(wasLiked)
      setCount(prev => prev + (wasLiked ? 1 : -1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        mt-4 flex items-center justify-center gap-2 
        w-12 h-12 rounded-full  
        transition-transform duration-200
        ${liked ? 'bg-red-400 text-white scale-110' : 'bg-gray-200 text-gray-700 scale-100'}
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
        p-3  /* extra padding inside the circle */
      `}
    >
      <span className="material-symbols-outlined text-2xl">
        favorite
      </span>
      <span className="text-gray-700 text-lg font-medium">{count}</span>
    </button>
  )
}

export default Like
