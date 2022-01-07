import React, { useEffect, useContext } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import CardExplorer from '../components/CardExplorer';
import fetchAPI from '../utils/fetchAPI';
import RecipesContext from '../context/RecipesContext';

function ExplorarComidasIngredientes() {
  const { ingredients, setIngredients } = useContext(RecipesContext);

  useEffect(() => {
    const requeredIngredients = async () => {
      const initialIngredients = await fetchAPI(
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      );

      console.log('ingrendients', initialIngredients);
      setIngredients(initialIngredients);
    };
    requeredIngredients();
  }, [setIngredients]);
  return (
    <>
      <Header objectProps={ optionsObject.exploreMealsByIngredients } />
      <CardExplorer
        test={ ingredients }
        objectProps={ optionsObject.exploreMealsByIngredients }
      />
    </>
  );
}

export default ExplorarComidasIngredientes;
