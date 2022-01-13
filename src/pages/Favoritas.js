import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import RecipesFavorite from '../components/RecipesFavorite';

function Favoritas() {
  return (
    <div>
      <Header objectProps={ optionsObject.favorites } />
      <RecipesFavorite
        objectMeal={ optionsObject.meal }
        objectDrink={ optionsObject.drink }
      />
    </div>
  );
}

export default Favoritas;
