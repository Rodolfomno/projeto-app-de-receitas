import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchAPI from '../utils/fetchAPI';

function RecipesProvider({ children }) {
  const [globalData, setGlobalData] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState('');

  /*   const [filterByCategories, setFilterByCategories] = useState({}); */

  useEffect(() => {
    async function getCategories() {
      const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setDrinkCategories(drinks);
      setMealsCategories(meals);
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

    /*     filterByCategories,
    setFilterByCategories, */
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
