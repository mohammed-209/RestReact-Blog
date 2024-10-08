import React, { useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosInstance.post('user/logout/blacklist/', {
          refresh_token: localStorage.getItem('refresh_token'),
        });
      } catch (error) {
        console.error("Failed to blacklist refresh token", error);
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      navigate('/login');
    };

    logout();
  }, [navigate]);

  return <div>Logout</div>;
}
