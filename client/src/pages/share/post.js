

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from "../../components/Sidebar"
import ProfilePic from './user.share'
import Like from './likes'
import Comments from './comments.share'
import DeleteButton from './delete.share'

const Retrieve = ({ post, token }) => {
  const [userId, setUserId] = useState(null)

  // ✅ Use GET instead of POST
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get('http://localhost:5000/settings/retrieveId', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUserId(res.data.user_id)
      } catch (err) {
        console.error('Failed to retrieve user ID:', err)
      }
    }

    if (token) fetchUserId()
  }, [token])

  if (!userId) {
    return <div className="text-gray-500">Loading posts...</div>
  }

  // Filter out user's own posts
  const otherPosts = post.filter((p) => p.user_id === userId)

  return (
    <div>

        <p className='w-full font-extrabold text-[24px]'>Your Posts</p>
        <p className='w-full text-gray-500 mt-2 text-[16px]'>Previous Posts made by you</p>

      <div>
        {otherPosts.length === 0 ? (
          <div className="text-gray-500 mt-6 ml-10">No posts to discover yet.</div>
        ) : (
          otherPosts.map((p) => (
            <div
              key={p.id}
              className="flex flex-col p-8 border-b border-gray-300 shadow-md bg-white rounded-lg mb-4 m-10"
            >
              <div className="flex items-center space-x-4">
                <ProfilePic userId={p.user_id} />
              </div>

              <p className="mt-3 text-gray-400 text-sm">
                Posted on: {p.shared_at.slice(0, 10)}
              </p>

              <h2 className="text-lg font-bold mt-3 mb-3">{p.title}</h2>

              {p.img && (
                <img
                  src={`http://localhost:5000/${p.img}`}
                  alt={p.title}
                  className="w-1/2 h-auto object-cover rounded mx-auto"
                />
              )}

              <div className="flex flex-col">
                <p className="text-gray-600 mt-3">{p.tag}</p>
              </div>

              <Like postId={p.id} initiallyLiked={false} />
              <Comments postId={p.id} userId={p.user_id} token={token} />
              <DeleteButton postId={p.id} token={token} />

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Retrieve
