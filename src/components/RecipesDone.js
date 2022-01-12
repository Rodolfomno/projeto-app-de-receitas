import React, { useState, useEffect } from 'react';
/* import RecipesDoneCard from './RecipesDoneCard'; */

function RecipesDone() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  useEffect(() => {
    setDoneRecipes(localStorage.getItem('doneRecipes'));
  }, []);
  const handleClickCategories = (clickedCategory) => {
    const filtered = doneRecipes.filter((item) => item.type === clickedCategory);
    setFilteredDoneRecipes(filtered);
  };
  console.log(filteredDoneRecipes);
  return (
    <>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickCategories('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClickCategories('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickCategories('drinks') }
        >
          Drinks
        </button>
      </div>
      {/*       { filteredDoneRecipes.map((item, index) => {
        <RecipesDoneCard test={ item } index={ index } />;
      }) } */}
    </>
  );
}
export default RecipesDone;
