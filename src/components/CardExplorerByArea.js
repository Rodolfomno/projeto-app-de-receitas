import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchAPI from '../utils/fetchAPI';

function CardExplorerByArea({ country, object }) {
  const { setRecipesArea, recipesArea, countryList } = useContext(RecipesContext);
  const { pagePath, idType } = object;

  useEffect(() => {
    const requeredByArea = async () => {
      if (country === 'All') {
        const recipesByArea = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        console.log('useEff');
        setRecipesArea(recipesByArea);
      } else {
        const recipesByArea = await fetchAPI(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
        );
        setRecipesArea(recipesByArea);
      }
    };
    requeredByArea();
  }, [country, countryList, setRecipesArea]);

  console.log('recipesAre', recipesArea);
  const MAX_NUMBER_OF_RECIPES = 12;
  return (
    <div>
      <ul>
        { recipesArea.meals && (
          recipesArea.meals.map((item, index) => (
            index < MAX_NUMBER_OF_RECIPES && (
              <Link to={ (`${pagePath}/${item[idType]}`) }>
                <li
                  data-testid={ `${index}-recipe-card` }
                  key={ item.idMeal }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    width="100px"
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                  />
                  <p data-testid={ `${index}-card-name` }>{item.strMeal }</p>

                </li>
              </Link>
            )

          )))}
      </ul>
    </div>

  );
}

CardExplorerByArea.propTypes = {
  country: PropTypes.shape({
    selectedCountry: PropTypes.string,
  }).isRequired,
  object: PropTypes.shape({
    idType: PropTypes.string,
    pagePath: PropTypes.string,
  }).isRequired,
};

export default CardExplorerByArea;
