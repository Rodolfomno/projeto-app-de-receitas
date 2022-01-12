import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function Categories({ objectProps }) {
  const MAX_NUMBER_OF_CATEGORIES = 5;
  const { recipeType } = objectProps;
  const { drinkCategories, mealsCategories,
    filterCategories, setFilterCategories } = useContext(RecipesContext);

  const handleClickCategories = (categoryClicked) => {
    if (filterCategories === categoryClicked) {
      setFilterCategories('');
    } else {
      setFilterCategories(categoryClicked);
    }
  };

  const categories = (recipeType === 'meals') ? mealsCategories : drinkCategories;

  return (
    <section>
      {categories && (
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClickCategories('') }
          >
            All
          </button>
          {categories.slice(0, MAX_NUMBER_OF_CATEGORIES).map((meal) => (
            <button
              type="button"
              key={ meal.strCategory }
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ () => handleClickCategories(meal.strCategory) }
            >
              {meal.strCategory}
            </button>))}
        </div>
      )}
    </section>
  );
}

Categories.propTypes = {
  objectProps: PropTypes.shape({
    recipeType: PropTypes.string,
  }).isRequired,
};
