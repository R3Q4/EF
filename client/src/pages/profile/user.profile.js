import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const UserProfile = () => {
    const [profile, setProfile] = React.useState(null);
    const [data, setData] = useState('')
    useEffect(() => {
        const fetchPosts = async () => {
          const token = localStorage.getItem('token');
          if (!token) return
        
          try {
            const res = await axios.get(`http://localhost:5000/settings/retrieve`, {
              headers: {  Authorization: `Bearer ${token}` },
            })
            console.log(res.data)
            setData(res.data || '')
            setProfile(res.data || null)
          } catch (err) {
            console.error(err)
          }
        };

        fetchPosts()
    }, [])

    return(
        <div className='flex'>

          {profile && profile.pic ? (
            <div>
            <img src={`http://localhost:5000/images/${profile.pic}`} className="w-14 h-14 object-cover rounded-full border-2 border-slate-200"/>
            
            </div>
            ):( 
            <p className=' material-symbols-outlined w-14 h-14 text-[56px] flex items-center justify-center border-2 border-slate-200 rounded-full bg-gray-100'>account_circle</p>
            )}
            

        </div>
    )
}
export default UserProfile