import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Adjust path based on your file structure

export default function Navbar() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/venues">Venues</Link>
        {user && <Link to="/bookings">My Bookings</Link>}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
