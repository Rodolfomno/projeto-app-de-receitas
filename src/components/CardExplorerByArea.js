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
        setRecipesArea(await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s='));
      } else {
        setRecipesArea(await fetchAPI(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
        ));
      }
    };
    requeredByArea();
  }, [country, countryList, setRecipesArea]);

  const MAX_NUMBER_OF_RECIPES = 11;
  console.log('recipesArea', recipesArea);
  return (
    <div>

      { (recipesArea && recipesArea.meals) && (
        recipesArea.meals.map((item, index) => (
          index <= MAX_NUMBER_OF_RECIPES && (
            <Link
              className="settingRecomandationLink"
              to={ (`${pagePath}/${item[idType]}`) }
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

            </Link>
          )

        )))}
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
