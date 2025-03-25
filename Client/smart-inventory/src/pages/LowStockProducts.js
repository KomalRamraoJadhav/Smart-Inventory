import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import '../styles/Products.css';

const LowStockProducts = () => {
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    // Fetch low stock products data
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/lowstock');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLowStockProducts(data); // Directly set the data (plain list)
    } catch (error) {
      console.error('Error fetching low stock products:', error);
    }
  };

  return (
    <div className="products-container">
      <Sidebar />
      <div className="products-content">
        <header>
          <h1>Low Stock Products</h1>
          <button onClick={() => navigate('/dashboard')} className="back-button">Back to Dashboard</button>
        </header>
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <tr key={product.p_id}>
                  <td>{product.p_id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.expiry_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">No low stock products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockProducts;
