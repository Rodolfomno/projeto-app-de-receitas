import PropTypes from 'prop-types';
import React from 'react';

export default function Cards({ test }) {
  console.log(test);
  const magic = 12;
  return (
    <ul>
      { test.meals && test.meals.map((item, index) => (
        index < magic && (
          <li key={ index }>
            <img src={ item.strMealThumb } alt={ item.strMeal } />
            {item.strMeal}
          </li>
        )
      ))}
    </ul>
  );
}

Cards.propTypes = {
  test: PropTypes.shape({
    meals: PropTypes.shape({
      map: PropTypes.func,
    }),
  }).isRequired,
};
