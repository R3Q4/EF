import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from "../../components/Sidebar"
import ProfilePic from './user.share'
import Like from './likes'
import Comments from './comments.share'
import DeleteButton from './delete.share'

function Post({post, token}){
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchId = async () => {
            setError(false)
            try {  
                const res = await axios.get('http://localhost:5000/settings/retrieveId', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUserId(res.data.user_id)
            } catch (err) {
                console.error('Failed to fetch user ID:', err)
                setError(true)
            }
        }
        if (token) fetchId()
        else{ setError(true)}
    }, [token])

    if (!userId){
        return <div className = 'text-gray-500'>Please login to share and view posts...</div>
    }
    if (error){
        return <div className = 'text-gray-500'>Error please try again  </div>
    }

    const myPosts = post.filter((p) => p.user_id === userId)

    return (
        <div className='w-full flex flex-col'>

            <div className='flex items-center space-x-3 text-teal-900 font-bold rounded'> 
                <p className='material-symbols-outlined'>post</p> 
                <p className='w-full font-extrabold text-[24px] text-teal-700 '>Your Posts</p>
            </div>
            <p className='w-full text-gray-500 mt-2 text-[16px]'>Previous posts made by you</p>
            <div className='mt-3'>
                {myPosts.length === 0 ? (
                    <div className="text-gray-500 text-center mt-6 ml-10 font-bold">No posts found yet</div>
                ) : (
                    myPosts.map((p) => (
                        <div key={p.id} className="flex flex-col p-8 border-b border-gray-300 shadow-md bg-white rounded-lg mb-4 m-10">
                            <div className="flex items-center space-x-4">
                                <ProfilePic userId={p.user_id} />
                            </div>
                            <p className="mt-3 text-gray-400 text-sm">Posted on: {p.shared_at.slice(0, 10)}</p>
                            <h2 className="text-lg font-bold mt-3 mb-3">{p.title}</h2>

                            {post.img && (
                                
                                    <img src={`http://localhost:5000/${p.img}`} alt={p.title} className="w-full h-auto rounded-md mb-4" />)} 
                                    <Like postId={p.id} initiallyLiked = {false} />
                                    <Comments postId={p.id} token={token} />
                                    <DeleteButton postId={p.id} token={token} />
                                            

                             
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Post