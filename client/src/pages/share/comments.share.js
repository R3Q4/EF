import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePic from './user.share'

export default function CommentSection({ postId, userId, token }) {
  const [comments, setComments] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/share/retrieveComment?post_id=${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Ensure comments is always an array
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load comments');
      setComments([]); // fallback to empty array
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/share/addComment',
        { post_id: postId, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage('');
      fetchComments(); // Refresh comment list
    } catch (err) {
      console.error(err);
      setError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4 bg-gray-100 rounded-lg p-4">
      <h3 className="font-bold mb-2">Comments</h3>

      {comments && comments.length > 0 ? (
        <div className="space-y-4 p-4 max-h-64 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm mt-5"><ProfilePic userId = {userId} /></p>
              <p className="text-gray-700 mt-4 mb-4 ml-20">{comment.content || comment.message}</p>
              <p className="text-gray-400 text-xs ml-20">
                {comment.commented_at
                  ? new Date(comment.commented_at).toLocaleString()
                  : 'Just now'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No comments yet</p>
      )}

      {/* Add new comment */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <textarea
          className="flex-1 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
          rows="2"
          placeholder="Write a comment..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          className="mt-2 sm:mt-0 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-400"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
