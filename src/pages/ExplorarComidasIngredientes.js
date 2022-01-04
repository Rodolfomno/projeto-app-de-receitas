import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';

function ExplorarComidasIngredientes() {
  return (
    <Header objectProps={ optionsObject.exploreMealsByIngredients } />
  );
}

export default ExplorarComidasIngredientes;
