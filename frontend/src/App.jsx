import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminManagement from './pages/AdminManagement';
import Venues from './pages/Venues';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true }}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/admin" element={<AdminManagement />} />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
            <Route path="/venues" element={<Venues />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
