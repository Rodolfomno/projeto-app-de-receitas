import React, { useState, useEffect } from 'react';
// import RecipesDoneCard from './RecipesDoneCard';

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
          onClick={ () => handleClickCategories('meal') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickCategories('drink') }
        >
          Drinks
        </button>
      </div>
      <ul>
        { filteredDoneRecipes.map((item, index) => (
          <li key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt="a"
              className="done-recipe-category"
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="done-recipe-category"
            >
              categoria da receita
            </p>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="done-recipe-name"
            >
              nome da receita
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="done-recipe-date"
            >
              Feita em:
              {' '}
              data de conclusão da receita
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar
            </button>
            {/* { test[tags].map((tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                className="done-recipe-tag"
                key={ tag }
              >
                { tag }
              </p>
            )) } */}
          </li>
        )) }
      </ul>

    </>
  );
}
export default RecipesDone;
