import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVenues: 0,
    totalBookings: 0,
    revenue: 0
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoggedIn || userRole !== 'ADMIN') {
        navigate('/login');
        return;
      }
      await fetchAnalytics();
    };

    checkAdminStatus();
  }, [navigate, isLoggedIn, userRole]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/analytics');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of your sports venue management system</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
            <p className="mt-2 text-sm text-gray-500">Registered users in the system</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500">Total Venues</h3>
              <span className="text-2xl">🏟️</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.totalVenues}</p>
            <p className="mt-2 text-sm text-gray-500">Active venues available</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500">Total Bookings</h3>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
            <p className="mt-2 text-sm text-gray-500">Completed bookings</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">${stats.revenue.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-500">Total earnings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/admin/users')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
            >
              <h3 className="font-semibold text-blue-600">Manage Users</h3>
              <p className="text-sm text-gray-600 mt-1">View and manage user accounts</p>
            </button>
            <button 
              onClick={() => navigate('/admin/venues')}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300"
            >
              <h3 className="font-semibold text-green-600">Manage Venues</h3>
              <p className="text-sm text-gray-600 mt-1">Add or edit venue details</p>
            </button>
            <button 
              onClick={() => navigate('/admin/bookings')}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300"
            >
              <h3 className="font-semibold text-purple-600">View Bookings</h3>
              <p className="text-sm text-gray-600 mt-1">Monitor all bookings</p>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
} 