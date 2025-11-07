import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Like({ postId }) {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return
      try {
        const [countRes, likedRes] = await Promise.all([
          axios.get(`http://localhost:5000/share/likeCount?post_id=${postId}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:5000/share/isLiked?post_id=${postId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])
        setCount(Number(countRes.data.count) || 0)
        setLiked(Boolean(likedRes.data.liked))
      } catch (err) {
        console.error('Error fetching like data:', err)
      }
    }
    fetchData()
  }, [postId, token])

  const handleToggle = async () => {
    if (!token || loading) return
    setLoading(true)
    const wasLiked = liked

    try {
      setLiked(!wasLiked)
      setCount(prev => prev + (wasLiked ? -1 : 1))

      const url = wasLiked
        ? 'http://localhost:5000/share/unlike'
        : 'http://localhost:5000/share/like'

      await axios.post(
        url,
        { post_id: postId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const response = await axios.get(
        `http://localhost:5000/share/likeCount?post_id=${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCount(Number(response.data.count) || 0)
    } catch (err) {
      console.error('Error toggling like:', err)
      setLiked(wasLiked)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`mt-4 flex items-center justify-center gap-2 w-12 h-12 rounded-full  
        transition-transform duration-200
        ${liked ? 'bg-red-400 text-white scale-110' : 'bg-gray-200 text-gray-700 scale-100'}
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
        p-3`}
    >
      <span className="material-symbols-outlined text-2xl">
        favorite
      </span>
      <span className="text-gray-700 text-lg font-medium">{count}</span>
    </button>
  )
}

export default Like
