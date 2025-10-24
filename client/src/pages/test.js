import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar.js';

const AccountSettings = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Fetch current user info on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser({
        username: res.data.username,
        email: res.data.email,
        password: ''
      });
    })
    .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    // Simple validation
    if (!user.username || !user.email) {
      setError('Username and email cannot be empty.');
      return;
    }

    if (user.password && user.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to update account.');
      return;
    }

    axios.put('http://localhost:5000/user/update', user, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setStatus('Account updated successfully!');
      setUser(prev => ({ ...prev, password: '' })); // clear password field
      setTimeout(() => setStatus(''), 5000);
    })
    .catch(err => {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to update account.');
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {error && <p className="mb-4 p-3 bg-red-400 text-white font-semibold">{error}</p>}
        {status && <p className="mb-4 p-3 bg-green-400 text-white font-semibold">{status}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md">
          <div className="mb-4">
            <label className="block mb-1 font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 font-bold rounded hover:bg-teal-600 transition"
          >
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
