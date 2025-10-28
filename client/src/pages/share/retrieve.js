// not used

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import Icons from './icons'

function Retrieve(){

    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const token = localStorage.getItem('token');
          if (!token) return
        
          try {
            const res = await axios.get('http://localhost:5000/share/retrieve', {
              headers: {  Authorization: `Bearer ${token}` },
            })
            setPost(res.data)
          } catch (err) {
            console.error(err)
          }
        };

        fetchPosts()
    }, [])

    return(
    <div className='flex min-h-screen'>
      <Sidebar />
        <div className='w-full flex flex-col bg-slate-100'>
          <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Share Your Experience</p>
          <div className='flex'>

            <div className='flex w-16 min-h-screen bg-slate-200'>
                <div className = 'align-center space-x-4 mb-12 mt-4 text-gray-400'>
                    <p>Discover</p>
                    <p>Your Posts</p>
                </div>
            </div>

            <div classname='flex flex-col items-center justify-center'>
            </div>
            <div className='bg-slate-200 m-10 rounded-lg flex items-center align-center justify-center h-full mt-5  space-y-6 flex-col m-20'>
                {post.length === 0? (
                    <div className='text-gray-500'>No Posts Yet</div>
                ):(post.map((post) =>(
                        <div key={post.id} className='flex flex-col p-6'>
                            <p className='text-black font-bold text-sm'>{post.user_id}</p>
                            <p className='text-gray-400 text-sm'>Posted on: {post.shared_at.slice(0,10)}</p>
                            <h2 className='text-lg font-bold'>{post.title}</h2>

                            {post.img && (
                                <img src={`http://localhost:5000/${post.img}`} alt={post.title} className='w-50% h-50% object-cover rounded  items-center'/>
                            )}
                            
                            <div className='flex flex-col'>
                                <p className='text-gray-600'>{post.tag}</p>
                                <Icons postId ={post.id} initiallyLinked = {false}/>
                            </div>
                            <CommentSection postId={p.id} token={token} />

                        </div>
                     )
                            )
                )}


                </div>         
            </div>

        </div>
   </div>
    )
} export default Retrieve
