import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Cards({ test, objectProps }) {
  const MAX_NUMBER_OF_RECEIPES = 12;
  const { recipeType, image, name, idType, pagePath } = objectProps;

  return (
    <section>
      { test[recipeType] && test[recipeType].map((item, index) => (
        index < MAX_NUMBER_OF_RECEIPES && (
          <Link
            to={ (`${pagePath}/${item[idType]}`) }
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
          </Link>
        )
      ))}
    </section>
  );
}

Cards.propTypes = {
  objectProps: PropTypes.shape({
    API_URL_TYPE: PropTypes.string,
    category: PropTypes.string,
    idType: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    pagePath: PropTypes.string,
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
