import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token || !userId) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/settings/retrieveUser/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Log response to debug
        console.log('User profile:', res.data);

        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

return (
  <div className="flex items-center">
    {(profile && profile.pic[0]?.pic!=null) ? (
      <img
        src={`http://localhost:5000/images/${profile.pic[0]?.pic}`}
        alt="profile"
        className="w-14 h-14 object-cover rounded-full border-2 border-slate-200"
      />
    ) : (
      <div className="material-symbols-outlined w-14 h-14 text-[56px] flex items-center justify-center border-2 border-slate-200 rounded-full bg-gray-100">
        account_circle
      </div>
    )}
    <div className="ml-4 font-bold text-lg">{profile.username || 'Anonymous'}</div>
  </div>
)

}

export default UserProfile
