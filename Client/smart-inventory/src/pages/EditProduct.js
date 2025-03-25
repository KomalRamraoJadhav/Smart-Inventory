import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddProduct.css";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state || {});

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/updateproduct/${product.p_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          quantity: product.quantity,
          expiry_date: product.expiry_date, 
        }),
      });
  
      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/products"); // Redirect after success
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };
  

  return (
    <div className="add-product-container">
      <h1>Edit Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name || ""}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category || "" }
          onChange={handleChange}
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity || ""}
          onChange={handleChange}
          required
        />

        <label>Expiry Date:</label>
        <input
          type="date"
          name="expiry_date"
          value={product.expiry_date || ""}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
