import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/api';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <div className="px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium">
            {user.role}
          </div>
        </div>
      </div>
    </div>
  );
} 