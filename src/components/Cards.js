import PropTypes from 'prop-types';
import React from 'react';

export default function Cards({ test, objectProps }) {
  const MAX_NUMBER_OF_RECEIPES = 12;
  const { recipeType, image, name } = objectProps;
  return (
    <ul>
      { test[recipeType] && test[recipeType].map((item, index) => (
        index < MAX_NUMBER_OF_RECEIPES && (
          <li key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              width="100px"
              src={ item[image] }
              alt={ item[name] }
            />
            <p data-testid={ `${index}-card-name` }>{item[name]}</p>
          </li>
        )
      ))}
    </ul>
  );
}

Cards.propTypes = {
  objectProps: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    recipeType: PropTypes.string,
  }).isRequired,
  test: PropTypes.shape({
    meals: PropTypes.shape({
      map: PropTypes.func,
    }),
    drinks: PropTypes.shape({
      map: PropTypes.func,
    }),
  }).isRequired,
};
