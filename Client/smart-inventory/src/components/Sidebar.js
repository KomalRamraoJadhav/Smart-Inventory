import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`}>
      <button className="sidebar-toggle" onClick={() => setExpanded(!expanded)}>
        <FaBars />
      </button>
      <ul className="sidebar-menu">
        <li onClick={() => navigate("/dashboard")}>
          <FaHome className="sidebar-icon" />
          {expanded && "Dashboard"}
        </li>
        <li onClick={() => navigate("/profile")}>
          <FaUser className="sidebar-icon" />
          {expanded && "Profile"}
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          {expanded && "Logout"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
