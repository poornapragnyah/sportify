import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import VenueManagerDashboard from '../components/dashboard/VenueManagerDashboard';
import PlayerDashboard from '../components/dashboard/PlayerDashboard';
import Analytics from '../components/dashboard/Analytics';

const Dashboard = () => {
  const { userRole } = useAuth();

  const renderDashboard = () => {
    switch (userRole) {
      case 'ADMIN':
        return (
          <div className="space-y-8">
            <AdminDashboard />
            <Analytics />
          </div>
        );
      case 'VENUE_MANAGER':
        return <VenueManagerDashboard />;
      case 'PLAYER':
        return <PlayerDashboard />;
      default:
        return <div>No dashboard available for this role</div>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        {renderDashboard()}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 