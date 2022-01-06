import React, { useEffect, useContext } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Cards from '../components/Cards';
import fetchAPI from '../utils/fetchAPI';

function Bebidas() {
  const { globalData, setGlobalData } = useContext(RecipesContext);

  useEffect(() => {
    let initialRecipes = '';
    const requeredRecipes = async () => {
      initialRecipes = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setGlobalData(initialRecipes);
    };
    requeredRecipes();
  }, [setGlobalData]);
  return (globalData && (
    <div className="settingDrinks">
      <Header objectProps={ optionsObject.drink } />
      <Cards test={ globalData } objectProps={ optionsObject.drink } />
      <Footer />
    </div>
  )
  );
}

export default Bebidas;
