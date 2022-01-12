import React, { useContext, useEffect } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import fetchAPI from '../utils/fetchAPI';
import RecipesContext from '../context/RecipesContext';
import CardExplorer from '../components/CardExplorer';
import Footer from '../components/Footer';

function ExplorarBebidasIngredientes() {
  const { ingredients, setIngredients } = useContext(RecipesContext);

  useEffect(() => {
    const requeredIngredients = async () => {
      const initialIngredients = await fetchAPI(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      );
      if (initialIngredients) {
        console.log('ingrendients', initialIngredients);
        setIngredients(initialIngredients);
      }
    };
    requeredIngredients();
  }, [setIngredients]);
  return (
    <div className="settingBebidaIngrediente">
      <Header objectProps={ optionsObject.exploreDrinksByIngredients } />
      <CardExplorer
        test={ ingredients }
        objectProps={ optionsObject.exploreDrinksByIngredients }
        object={ optionsObject.drink }
      />
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
