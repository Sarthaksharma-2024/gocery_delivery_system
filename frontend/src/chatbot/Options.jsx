import React from 'react';

const Options = (props) => {
  const options = [
    {
      text: "Find products",
      handler: () => props.actionProvider.handleProducts(),
      id: 1,
    },
    {
      text: "Show deals",
      handler: () => props.actionProvider.handleDeals(),
      id: 2,
    },
    {
      text: "Browse categories",
      handler: () => props.actionProvider.handleCategories(),
      id: 3,
    },
    {
      text: "Find alternatives",
      handler: () => props.actionProvider.handleAlternatives(),
      id: 4,
    },
    {
      text: "Help",
      handler: () => props.actionProvider.handleHelp(),
      id: 5,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="option-button"
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;