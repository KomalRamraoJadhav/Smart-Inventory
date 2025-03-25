import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import '../styles/Products.css';

const ExpiredProducts = () => {
  const navigate = useNavigate();
  const [expiredProducts, setExpiredProducts] = useState([]);

  useEffect(() => {
    // Fetch expired products data
    fetchExpiredProducts();
  }, []);

  const fetchExpiredProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/expired');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Directly set the data to the state
      setExpiredProducts(data);
    } catch (error) {
      console.error('Error fetching expired products:', error);
    }
  };

  return (
    <div className="products-container">
      <Sidebar />
      <div className="products-content">
        <header>
          <h1>Expired Products</h1>
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
            {expiredProducts.length > 0 ? (
              expiredProducts.map((product) => (
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
                <td colSpan="5" className="no-data">No expired products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpiredProducts;
