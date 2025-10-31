import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserPic from "../profile/user.profile"

function Create(){
    const [file, setFile] = useState()
    const [title, setTitle] = useState()
    const [tag, setTag] = useState()
    const [status, setStatus] = useState()
    const [error, setError] = useState()
    const [username, setUsername] = useState('')

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = () => {
        if (!title || !tag){
            setError('Please fill in all fields')
            return
        }

        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', title)
        formData.append('tag', tag)
        
        const token = localStorage.getItem('token')
        if (!token) {alert (
            'No Token Found. Please Login before using' )
            return
        }
        try{
        axios.post('http://localhost:5000/share/upload',  formData ,{headers: {Authorization: `Bearer ${token}`}})
        .then(res => console.log(res))
        setStatus('Uploaded successfully')
        setFile(null)
        setTitle('')
        setTag('')
        setTimeout(() => {setStatus('')}, 3000)

        document.getElementById('fileInput').value = null
        } catch (err){
            console.error('Upload failed:', err)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios.get('http://localhost:5000/settings/retrieveUsername', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setUsername(res.data.username); // Set username from backend
        })
        .catch(err => {
            console.error('Failed to fetch user info:', err);
        });
    }, []);

    return (

        <div className='w-full flex flex-col'>

            
            <div className='flex items-center space-x-3 text-teal-900 font-bold rounded'> 
                <p className='material-symbols-outlined'>create</p> 
                <p className='w-full font-extrabold text-[24px] text-teal-700 '>Create posts</p>
            </div>
            <p className='w-full text-gray-500 mt-5 text-[16px]'>Share your experiences with others</p>
            
            {status && <p className='text-white mt-4 font-bold text-center p-4 bg-green-500 rounded'>{status}</p>}
            
            {error && <p className='text-red-500 mt-4'>{error}</p>}

            <div className='p-10 bg-white mt-10 h-full'>
                <div className='flex items-center mb-5'>
                    <UserPic />
                    <p className='text-black font-bold text-lg ml-4'>{username}</p>
                </div>

                <input type = 'text' value = {title} placeholder = 'Title' onChange={(e)=> setTitle(e.target.value)} className=' bg-slate-100 mt-3 w-full p-4 rounded-lg shadow-lg outline-none outline-none border-0 border-white'/>

                <textarea type = 'text' onChange = {(e)=> setTag(e.target.value)} value= {tag} placeholder = 'Review on experience' className='w-full p-4 shadow-lg mt-5 outline-none border-0 h-30'/>
                
                <input type="file" className='w-full mt-5' onChange={ handleFile } />

                <button onClick={ handleUpload } className ='bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition mt-10' type="submit">Submit</button>
                
            </div>
            

        </div>


    )
}
export default Create