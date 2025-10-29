import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import Post from './posts.share'
import Create from './create.share'
import Retrieve from './retrieve.share'

function Share(){

    const [transfer, setTransfer] = useState('')


    const handleClick = (e) => {
        setTransfer(e)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    
    const [post, setPost] = useState([])
    
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchPosts = async () => {
          if (!token) return
        
          try {
            const res = await axios.get('http://localhost:5000/share/retrieve', {
              headers: {  Authorization: `Bearer ${token}` },
            })
            setPost(res.data)
          } catch (err) {
            console.error(err)
          }
        }
        fetchPosts()}, [])

    return(
    <div className='flex min-h-screen'>
      <Sidebar />
        <div className='w-full flex flex-col bg-slate-100 '>
          <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Share Your Experience</p>
            <div className='flex'>
                    <div className = 'flex flex-col bg-gray-200  w-48  space-y-4 text-bold min-h-screen '>

                        <button onClick= {() => handleClick('discover')}>
                            <div className='ml-3 flex items-center space-x-3 px-2 py-2 mr-2 text-teal-900 font-bold rounded mt-10 hover:bg-teal-300 transition'> 
                                <p className='material-symbols-outlined'>visibility</p> 
                                <p>Discover</p>
                            </div>
                        </button>

                        <button onClick= {() => handleClick('post')}>
                            <div className='ml-3 flex items-center space-x-3 px-2 mr-2  py-2 text-teal-900 font-bold rounded hover:bg-teal-300 transition'> 
                                <p className='material-symbols-outlined'>post</p> 
                                <p>Your Posts</p>
                            </div>
                        </button>

                        <button onClick= {() => handleClick('create')}>
                            <div className='ml-3 flex items-center space-x-3 px-2 mr-2 py-2 rounded font-bold text-teal-900 hover:bg-teal-300 transition'> 
                                <p className='material-symbols-outlined'>create</p> 
                                <p>Create Posts</p>
                            </div>
                        </button>
                    </div>

                    <div className='flex-1 p-10'>
                        { (transfer === 'discover'||transfer==='') && <Retrieve post={post} token = {token} />}
                        { transfer === 'create' && <Create post={post} />}    
                        { transfer === 'post' && <Post post={post} token = {token} />}      
  
                    </div>
                </div>






        </div>

   </div>
    )
} export default Share
