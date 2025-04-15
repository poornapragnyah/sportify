import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

export default function Venues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    api.get('/venues')
      .then(response => setVenues(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Badminton Venues</h2>
      <ul>
        {venues.map(venue => (
          <li key={venue.id}>
            <strong>{venue.name}</strong> - {venue.location}
            <br />
            <Link to={`/book/${venue.id}`}>Book</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
