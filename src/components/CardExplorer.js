import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CardExplorer({ test, objectProps, object }) {
  const MAX_NUMBER_OF_INGREDIENTS = 12;
  const { recipeType, name } = objectProps;
  const { pagePath, idType } = object;

  return (
    <ul>
      { test[recipeType]
        && test[recipeType].map((item, index) => (

          index < MAX_NUMBER_OF_INGREDIENTS && (
            <Link to={ (`${pagePath}/${item[idType]}`) }>
              <li
                key={ index }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  width="100px"
                  src={ (recipeType === 'drinks') ? `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` : `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                  alt={ item[name] }
                />
                <p data-testid={ `${index}-card-name` }>
                  { (recipeType === 'drinks') ? item.strIngredient1 : item.strIngredient }
                </p>
              </li>
            </Link>
          )
        ))}
    </ul>
  );
}

CardExplorer.propTypes = {
  object: PropTypes.shape({
    idType: PropTypes.string,
    pagePath: PropTypes.string,
  }).isRequired,
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
    map: PropTypes.func,
    meals: PropTypes.shape({
      map: PropTypes.func,
    }),
  }).isRequired,
};
