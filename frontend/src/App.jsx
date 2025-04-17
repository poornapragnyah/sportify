import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Venues from './pages/Venues';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import VenueManagement from './components/dashboard/VenueManagement';
import VenueManagerVenues from './components/dashboard/VenueManagerVenues';
import AdminBookings from './components/dashboard/AdminBookings';
import VenueManagerBookings from './components/dashboard/VenueManagerBookings';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true }}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <ToastContainer position="bottom-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/venues" element={<Venues />} />
            
            {/* User Routes */}
            <Route path="/profile/:username" element={<Profile />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />

            {/* Admin Routes */}
            <Route path="/admin/venues" element={
              <DashboardLayout>
                <VenueManagement />
              </DashboardLayout>
            } />
            <Route path="/admin/bookings" element={
              <DashboardLayout>
                <AdminBookings />
              </DashboardLayout>
            } />
            {/* <Route path="/admin/users" element={
              <DashboardLayout>
                <UserManagement />
              </DashboardLayout>
            } /> */}

            {/* Venue Manager Routes */}
            <Route path="/manager/venues" element={
              <DashboardLayout>
                <VenueManagerVenues />
              </DashboardLayout>
            } />
            <Route path="/manager/bookings" element={
              <DashboardLayout>
                <VenueManagerBookings />
              </DashboardLayout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
