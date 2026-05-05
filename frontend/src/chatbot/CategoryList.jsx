import React from 'react';

const CategoryList = ({ payload, actionProvider }) => {
  if (!payload || payload.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="category-list-widget">
      {payload.map((category, idx) => {
        const label = typeof category === 'string' ? category : category.name || category.category;
        return (
          <button
            key={`${label}-${idx}`}
            className="category-button"
            onClick={() => actionProvider.handleCategoryProducts(label)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryList;
