import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

export default function VenueList() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    sportType: 'BADMINTON',
    priceRange: 'all'
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await api.get('/venues/search', {
        params: {
          name: filters.search || undefined,
          location: filters.location || undefined,
          sportType: filters.sportType
        }
      });
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast.error('Failed to load venues');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVenues();
  };

  const handleBookNow = (venueId) => {
    navigate(`/venues/${venueId}/book`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search venues..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="Enter location..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sport Type</label>
              <select
                value={filters.sportType}
                onChange={(e) => setFilters({ ...filters, sportType: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="BADMINTON">Badminton</option>
                <option value="TENNIS">Tennis</option>
                <option value="BASKETBALL">Basketball</option>
                <option value="FOOTBALL">Football</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="low">₹0 - ₹500</option>
                <option value="medium">₹501 - ₹1000</option>
                <option value="high">₹1000+</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Search Venues
            </button>
          </div>
        </form>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.length > 0 ? (
            venues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={venue.imageUrl || 'https://via.placeholder.com/400x225'}
                    alt={venue.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{venue.name}</h3>
                  <p className="text-gray-600 mb-4">{venue.location}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm">Available Courts:</span>
                      <span className="ml-2 font-semibold text-gray-900">{venue.totalCourts}</span>
                    </div>
                    <div className="text-green-600 font-semibold">₹{venue.pricePerHour}/hour</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.facilities?.split(',').map((facility, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {facility.trim()}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleBookNow(venue.id)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No venues found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 