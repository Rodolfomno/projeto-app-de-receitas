import React, { useEffect, useContext } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Cards from '../components/Cards';
import fetchAPI from '../utils/fetchAPI';
import Categories from '../components/Categories';

function Comidas() {
  const { globalData, setGlobalData } = useContext(RecipesContext);
  const { filterCategories } = useContext(RecipesContext);

  useEffect(() => {
    let initialRecipes = '';
    const requeredRecipes = async (URL) => {
      initialRecipes = await fetchAPI(URL);
      setGlobalData(initialRecipes);
    };
    if (filterCategories === undefined || filterCategories === '') {
      requeredRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      requeredRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterCategories}`);
    }
  }, [setGlobalData, filterCategories]);

  return (globalData && (
    <div className="settingFood">
      <Header objectProps={ optionsObject.meal } />
      <Categories objectProps={ optionsObject.meal } />
      <Cards test={ globalData } objectProps={ optionsObject.meal } />
      <Footer />
    </div>)
  );
}
export default Comidas;
