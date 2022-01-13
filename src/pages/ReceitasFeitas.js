import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import RecipesDone from '../components/RecipesDone';

function ReceitasFeitas() {
  return (
    <div>
      <Header objectProps={ optionsObject.recipesMade } />
      <RecipesDone />
    </div>
  );
}

export default ReceitasFeitas;
