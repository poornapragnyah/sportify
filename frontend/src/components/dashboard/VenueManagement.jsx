import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';

export default function VenueManagement() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: '',
    sportType: 'BADMINTON',
    totalCourts: 1,
    pricePerHour: 0,
    openingTime: '06:00',
    closingTime: '22:00'
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await api.get('/admin/venues');
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast.error('Failed to load venues');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedVenue) {
        await api.put(`/admin/venues/${selectedVenue.id}`, formData);
        toast.success('Venue updated successfully');
      } else {
        await api.post('/admin/venues', formData);
        toast.success('Venue created successfully');
      }
      fetchVenues();
      resetForm();
    } catch (error) {
      console.error('Error saving venue:', error);
      toast.error('Failed to save venue');
    }
  };

  const handleEdit = (venue) => {
    setSelectedVenue(venue);
    setFormData({
      name: venue.name,
      location: venue.location,
      description: venue.description,
      imageUrl: venue.imageUrl,
      sportType: venue.sportType,
      totalCourts: venue.totalCourts,
      pricePerHour: venue.pricePerHour,
      openingTime: venue.openingTime,
      closingTime: venue.closingTime
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        await api.delete(`/admin/venues/${id}`);
        toast.success('Venue deleted successfully');
        fetchVenues();
      } catch (error) {
        console.error('Error deleting venue:', error);
        toast.error('Failed to delete venue');
      }
    }
  };

  const resetForm = () => {
    setSelectedVenue(null);
    setFormData({
      name: '',
      location: '',
      description: '',
      imageUrl: '',
      sportType: 'BADMINTON',
      totalCourts: 1,
      pricePerHour: 0,
      openingTime: '06:00',
      closingTime: '22:00'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Venue Management</h1>
      
      {/* Venue Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedVenue ? 'Edit Venue' : 'Add New Venue'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sport Type</label>
              <select
                value={formData.sportType}
                onChange={(e) => setFormData({ ...formData, sportType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="BADMINTON">Badminton</option>
                <option value="TENNIS">Tennis</option>
                <option value="BASKETBALL">Basketball</option>
                <option value="FOOTBALL">Football</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Courts</label>
              <input
                type="number"
                value={formData.totalCourts}
                onChange={(e) => setFormData({ ...formData, totalCourts: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price per Hour</label>
              <input
                type="number"
                value={formData.pricePerHour}
                onChange={(e) => setFormData({ ...formData, pricePerHour: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Time</label>
              <input
                type="time"
                value={formData.openingTime}
                onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Time</label>
              <input
                type="time"
                value={formData.closingTime}
                onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {selectedVenue ? 'Update Venue' : 'Add Venue'}
            </button>
          </div>
        </form>
      </div>

      {/* Venues List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Hour</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {venues.map((venue) => (
              <tr key={venue.id}>
                <td className="px-6 py-4 whitespace-nowrap">{venue.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{venue.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{venue.sportType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{venue.totalCourts}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{venue.pricePerHour}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(venue)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 