import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function Cards({ test, objectProps }) {
  const MAX_NUMBER_OF_RECEIPES = 12;
  const { recipeType, image, name, category } = objectProps;
  const { filterCategories } = useContext(RecipesContext);

  return (
    <ul>
      { test[recipeType] && test[recipeType].filter(
        (item) => (item[category] === filterCategories
          || filterCategories === ''),
      )
        .map((item, index) => (
          index < MAX_NUMBER_OF_RECEIPES && (
            <li
              key={ index }
              data-testid={ (recipeType === 'ingredient')
                ? `${index}-ingredient-card` : `${index}-recipe-card` }
            >
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
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    recipeType: PropTypes.string,
  }).isRequired,
  test: PropTypes.shape({
    drinks: PropTypes.shape({
      map: PropTypes.func,
    }),
    meals: PropTypes.shape({
      map: PropTypes.func,
    }),
  }).isRequired,
};
