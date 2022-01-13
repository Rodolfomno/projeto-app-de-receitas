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
  const [finish, setFinish] = useState(undefined);
  const [newData, setNewData] = useState('');

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
        alcoholic, recipeType, type } = optionsObject[receipe];
      const returnData = response[recipeType][0];
      const testAlcoholicOrNot = type === 'comida' ? '' : returnData[alcoholic];
      const testArea = type === 'comida' ? returnData[area] : '';
      const getFavorite = localStorage.getItem('favoriteRecipes');
      const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
      if (favorite === undefined) {
        const newRecipes = {
          id: returnData[idType],
          type,
          category: returnData[category],
          alcoholicOrNot: testAlcoholicOrNot,
          name: returnData[name],
          image: returnData[image],
          area: testArea,
        };
        localStorage.setItem(
          'favoriteRecipes', JSON.stringify([...favoritesReceipes, { ...newRecipes }]),
        );
      } else {
        const local = favoritesReceipes.filter((item) => item.id !== returnData[idType]);
        localStorage.setItem('favoriteRecipes', JSON.stringify(local));
      }
      setFavorite(favorite === undefined ? 'true' : undefined);
    }
  }, [test]);

  useEffect(() => {
    if (receipe) {
      const { idType, image, name, area, category,
        alcoholic, recipeType, type } = optionsObject[receipe];
      const returnData = response[recipeType][0];
      const testAlcoholicOrNot = type === 'comida' ? '' : returnData[alcoholic];
      const testArea = type === 'comida' ? returnData[area] : '';
      const getDone = localStorage.getItem('doneRecipes');
      const doneReceipes = getDone ? JSON.parse(getDone) : [];

      const newDoneRecipes = {
        id: returnData[idType],
        type,
        category: returnData[category],
        alcoholicOrNot: testAlcoholicOrNot,
        name: returnData[name],
        image: returnData[image],
        area: testArea,
        doneDate: newData,
        tags: returnData.strTags ? returnData.strTags.split(',') : [],
      };
      localStorage.setItem(
        'doneRecipes', JSON.stringify([...doneReceipes, { ...newDoneRecipes }]),
      );
    }
  }, [finish]);

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
    finish,
    setFinish,
    newData,
    setNewData,
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
