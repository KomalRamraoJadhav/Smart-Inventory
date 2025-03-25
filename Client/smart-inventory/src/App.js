import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Products from './pages/Products';
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ExpiredProducts from './pages/ExpiredProducts';
import LowStockProducts from './pages/LowStockProducts';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} /> 
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/expired-products" element={<ExpiredProducts />} />
        <Route path="/low-stock-products" element={<LowStockProducts />} />

      </Routes>
    </Router>
  );
}

export default App;
