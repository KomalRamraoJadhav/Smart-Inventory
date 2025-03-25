import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar'; 
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [expiredProducts, setExpiredProducts] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login");
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/counts');
      const data = await response.json();

      setTotalProducts(data.total_products || 0);
      setExpiredProducts(data.expired_products || 0);
      setLowStockProducts(data.low_stock_products || 0);
      setRecentlyAdded(data.recently_added || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <header className="dashboard-header">
        <h1>Welcome to Smart Inventory, {username}!</h1>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-card1" onClick={() => navigate("/products")}>
          <h2>Total Products</h2>
          <h3>{totalProducts}</h3>
        </div>
        <div className="dashboard-card2" onClick={() => navigate("/expired-products")}>
          <h2>Expired Products</h2>
          <h3>{expiredProducts}</h3>
        </div>
        <div className="dashboard-card3" onClick={() => navigate("/low-stock-products")}>
          <h2>Low Stock</h2>
          <h3>{lowStockProducts}</h3>
        </div>
        <div className="dashboard-card4">
          <h2>Recently Added</h2>
          <h3>{recentlyAdded.length > 0 ? recentlyAdded.join(', ') : 'No products added recently'}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
