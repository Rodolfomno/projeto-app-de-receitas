import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';

function RecipesProvider({ children }) {
  const [globalData, setGlobalData] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [recipesArea, setRecipesArea] = useState([]);
  const [data, setData] = useState({});
  const [response, setResponse] = useState({});
  const [allMeasures, setAllMeasures] = useState('');
  const [instruction, setInstruction] = useState('');
  const [receipe, setReceipe] = useState('');
  const [favorite, setFavorite] = useState(undefined);
  const [test, setTest] = useState(undefined);

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

  useEffect(() => {
    if (receipe) {
      const { idType, image, name, area, category,
        alcoholic, recipeType } = optionsObject[receipe];
      const returnData = response[recipeType][0];
      if (favorite === undefined) {
        const newRecipes = {
          id: returnData[idType],
          type: receipe === 'drink' ? 'bebida' : 'comida',
          category: returnData[category],
          alcoholicOrNot: returnData[alcoholic],
          name: returnData[name],
          image: returnData[image],
          area: returnData[area],
        };
        const getFavorite = localStorage.getItem('favoriteRecipes');
        const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
        localStorage.setItem(
          'favoriteRecipes', JSON.stringify([...favoritesReceipes, { ...newRecipes }]),
        );
      } else {
        const getFavorite = localStorage.getItem('favoriteRecipes');
        const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
        const local = favoritesReceipes.filter((item) => item.id !== returnData[idType]);
        localStorage.setItem('favoriteRecipes', JSON.stringify(local));
      }
      setFavorite(favorite === undefined ? 'true' : undefined);
    }
  }, [test]);

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
    setData,
    data,
    setResponse,
    response,
    setAllMeasures,
    allMeasures,
    setInstruction,
    instruction,
    receipe,
    setReceipe,
    favorite,
    setFavorite,
    test,
    setTest,
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
