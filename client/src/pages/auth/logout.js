import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    navigate('/signup', { replace: true });}, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">Logging out...</p>
    </div>
  )
}