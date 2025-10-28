import React, { useState } from 'react'
import axios from 'axios'

function Comments({ postId }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [newComment, setNewComment] = useState('')
      
    const token = localStorage.getItem('token')

    const fetchComments = async () => {
        if (!token) return
        setLoading(true)
        setError(null)
        try {
            const res = await axios.get(`http://localhost:5000/share/retrieveComment?post_id=${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setComments(Array.isArray(res.data) ? res.data : [] )
        } catch (err) {
            setError('Failed to load comments')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddComment = async () => { 
        if (!token || !newComment.trim()) return
        try {
            await axios.post('http://localhost:5000/share/addComment', {
                post_id: postId,
                content: newComment,
            }, { headers: { Authorization: `Bearer ${token}` } })
            setNewComment('')
            fetchComments()
        } catch (err) {
            console.error('Failed to add comment', err)
        }
    }

    return (
      <div>
        <div className="mt-4 w-full">
          <button onClick={fetchComments}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Load Comments
          </button>

          {loading && <p>Loading comments...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {(comments && comments.length >0 )? (
            comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-300 py-2">
              <p className="text-sm text-gray-600">{comment.user_id}:</p>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))):(
            <div className='text-gray-500'>No comments yet</div>
          )}
        </div>
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-2"
            placeholder="Add a comment..."
          />
          
          <button onClick={handleAddComment}
            className="bg-green-500 text-white px-4 py-2 rounded">Submit Comment
          </button>

        </div>
      </div>
    )
}
export default Comments