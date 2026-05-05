import React from 'react';
import axios from 'axios';

const getAuthHeader = () => {
  const token =
    localStorage.getItem('authToken') ||
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);

const ProductList = ({ payload }) => {
  if (!payload || payload.length === 0) {
    return <div>No products found.</div>;
  }

  const handleAddToCart = async (product) => {
    try {
      await axios.post(
        '/api/cart',
        { productId: product._id || product.id, quantity: 1 },
        getAuthHeader()
      );
      alert(`Added ${product.name} to cart!`);
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('Could not add to cart. Please make sure you are logged in.');
    }
  };

  return (
    <div className="product-list-widget">
      {payload.map((item) => (
        <div key={item._id || item.id} className="product-card">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="product-card-image" />
          ) : null}
          <div className="product-card-content">
            <h4>{item.name}</h4>
            <p>{item.category}</p>
            <p>
              <strong>{formatCurrency(item.price)}</strong>
              {item.oldPrice && item.oldPrice > item.price ? (
                <span className="old-price"> {formatCurrency(item.oldPrice)}</span>
              ) : null}
            </p>
            {item.description ? <p>{item.description}</p> : null}
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
