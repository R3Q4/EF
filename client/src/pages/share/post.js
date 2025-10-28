import React from 'react'
import Sidebar from "../../components/Sidebar"
import ProfilePic from './user.share'
import Like from './likes'
import Comments from './comments.share'

const Post = ({post, token}) => {
    return(
        <div>
            <p className='w-full font-extrabold text-[24px]'>Discover</p>
            <p className='w-full text-gray-500 mt-2 text-[16px]'>Hear and learn from others experiences </p>

            <div className='p-4 border-b border-gray-300 shadow-md bg-white rounded-lg mb-4 m-10'>
                
                {post.length === 0? (<div className='text-gray-500'>No Posts Yet</div>)
                :
                (post.map((post) =>(
                    <div key={post.id} className='flex flex-col p-6'>
                        <div className='flex items-center space-x-4'>
                            <div className=''><ProfilePic userId = {post.user_id} /></div>
                        </div>
                        
                        <p className='mt-3 text-gray-400 text-sm'>Posted on: {post.shared_at.slice(0,10)}</p>


                        <h2 className='text-lg font-bold mt-3 mb-3'>{post.title}</h2>

                        {post.img && (
                            <img src={`http://localhost:5000/${post.img}`} alt={post.title} className='w-50% h-50% object-cover rounded  items-center'/>
                        )}
                        <div className='flex flex-col'>
                            <p className='text-gray-600 mt-3'>{post.tag}</p>
                        </div>
                        
                        <Like postId ={post.id} initiallyLinked = {false}/>
                        <Comments key = {post.id} postId = {post.id} userId = {post.user_id}  token = {token}></Comments>
                    </div>)
                    )
                )}     
            </div>
        </div>

    )
}
export default Post