import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';

function ReceitasFeitas() {
  return (
    <div>
      <Header objectProps={ optionsObject.recipesMade } />
    </div>
  );
}

export default ReceitasFeitas;
