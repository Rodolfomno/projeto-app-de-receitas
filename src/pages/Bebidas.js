import React, { useEffect, useContext } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Cards from '../components/Cards';
import fetchAPI from '../utils/fetchAPI';
import Categories from '../components/Categories';

function Bebidas() {
  const { globalData, setGlobalData } = useContext(RecipesContext);
  const { filterCategories } = useContext(RecipesContext);

  useEffect(() => {
    let initialRecipes = '';
    const requeredRecipes = async (URL) => {
      initialRecipes = await fetchAPI(URL);
      setGlobalData(initialRecipes);
    };
    if (filterCategories === undefined || filterCategories === '') {
      requeredRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else {
      requeredRecipes(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterCategories}`);
    }
  }, [setGlobalData, filterCategories]);

  return (globalData && (
    <div className="settingDrinks">
      <Header objectProps={ optionsObject.drink } />
      <Categories objectProps={ optionsObject.drink } />
      <Cards test={ globalData } objectProps={ optionsObject.drink } />
      <Footer />
    </div>
  )
  );
}

export default Bebidas;
