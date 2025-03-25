import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Smart Inventory & Expiry Tracker</h1>
        <p className="home-text">Track your inventory easily and never miss an expiry date.</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button login-button">Log In</Link>
          <Link to="/register" className="home-button register-button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
