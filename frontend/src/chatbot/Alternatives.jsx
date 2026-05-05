import React from 'react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);

const Alternatives = (props) => {
  const { payload } = props;

  if (!payload || payload.length === 0) {
    return <div>No alternatives available.</div>;
  }

  const alternativesMarkup = payload.map((alt, index) => (
    <div key={index} className="alternative-item">
      {alt.imageUrl ? (
        <img src={alt.imageUrl} alt={alt.name} className="alternative-image" />
      ) : null}
      <div className="alternative-details">
        <h4>{alt.name}</h4>
        <p>{formatCurrency(alt.price)}</p>
        <p>{alt.description}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => {
            alert(`Added ${alt.name} to cart!`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="alternatives-container">
      <h3>Cheaper Alternatives:</h3>
      {alternativesMarkup}
    </div>
  );
};

export default Alternatives;