import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cards({ test, objectProps, categoryAlcoholic }) {
  const RECEIPES_DETAILS = 6;
  const RECEIPES_MAIN_PAGES = 12;
  const MAX_NUMBER_OF_RECEIPES = (categoryAlcoholic === undefined)
    ? RECEIPES_MAIN_PAGES : RECEIPES_DETAILS;
  const { recipeType, image, name, idType, pagePath } = objectProps;
  const [dataTestId, setDataTestId] = useState('');

  useEffect(() => {
    async function verifyTestId() {
      if (categoryAlcoholic === undefined) {
        if (recipeType === 'ingredient') {
          setDataTestId('-ingredient-card');
        } else {
          setDataTestId('-recipe-card');
        }
      } else {
        setDataTestId('-recomendation-card');
      }
    }
    verifyTestId();
  }, []);

  return (
    <section>
      { test[recipeType] && test[recipeType].map((item, index) => (
        index < MAX_NUMBER_OF_RECEIPES && (
          <Link
            to={ (`${pagePath}/${item[idType]}`) }
            key={ index }
            data-testid={ index + dataTestId }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100px"
              src={ item[image] }
              alt={ item[name] }
            />
            {categoryAlcoholic && (
              <h4 data-testid="recipe-category">
                {item[categoryAlcoholic]}
              </h4>)}
            <p data-testid={ `${index}-card-name` }>{item[name]}</p>
          </Link>
        )
      ))}
    </section>
  );
}

Cards.propTypes = {
  categoryAlcoholic: PropTypes.string.isRequired,
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
