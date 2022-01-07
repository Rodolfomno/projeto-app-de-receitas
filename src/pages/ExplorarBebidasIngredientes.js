import React, { useContext, useEffect } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import fetchAPI from '../utils/fetchAPI';
import RecipesContext from '../context/RecipesContext';
import CardExplorer from '../components/CardExplorer';

function ExplorarBebidasIngredientes() {
  const { ingredients, setIngredients } = useContext(RecipesContext);

  useEffect(() => {
    const requeredIngredients = async () => {
      const initialIngredients = await fetchAPI(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      );

      console.log('ingrendients', initialIngredients);
      setIngredients(initialIngredients);
    };
    requeredIngredients();
  }, [setIngredients]);
  return (
    <>
      <Header objectProps={ optionsObject.exploreDrinksByIngredients } />
      <CardExplorer
        test={ ingredients }
        objectProps={ optionsObject.exploreDrinksByIngredients }
      />
    </>
  );
}

export default ExplorarBebidasIngredientes;
