import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';

function ExplorarBebidasIngredientes() {
  return (
    <Header objectProps={ optionsObject.exploreDrinksByIngredients } />
  );
}

export default ExplorarBebidasIngredientes;
