import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchAPI from '../utils/fetchAPI';

function RecipesProvider({ children }) {
  const [globalData, setGlobalData] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [recipesArea, setRecipesArea] = useState([]);
  console.log('Paises Provider', countryList);

  useEffect(() => {
    async function getCategories() {
      const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals: country } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setDrinkCategories(drinks);
      setMealsCategories(meals);
      setCountryList([{ strArea: 'All' }, ...country]);
    }
    getCategories();
  }, []);

  const value = {
    globalData,
    setGlobalData,
    drinkCategories,
    mealsCategories,
    filterCategories,
    setFilterCategories,
    setIngredients,
    ingredients,
    countryList,
    recipesArea,
    setRecipesArea,
  };

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
