import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function Categories({ objectProps }) {
  const MAX_NUMBER_OF_CATEGORIES = 5;
  const { recipeType } = objectProps;
  const { drinkCategories, mealsCategories,
    filterCategories, setFilterCategories } = useContext(RecipesContext);

  const categories = recipeType === 'meals' ? mealsCategories : drinkCategories;

  const handleClickCategories = (categoryClicked) => {
    if (filterCategories === categoryClicked) {
      setFilterCategories('');
    } else {
      setFilterCategories(categoryClicked);
    }
  };

  return (
    categories.slice(0, MAX_NUMBER_OF_CATEGORIES).map((meal) => (
      <button
        type="button"
        key={ meal.strCategory }
        data-testid={ `${meal.strCategory}-category-filter` }
        onClick={ () => handleClickCategories(meal.strCategory) }
      >
        {meal.strCategory}
      </button>))

  );
}

Categories.propTypes = {
  objectProps: PropTypes.shape({
    recipeType: PropTypes.string,
  }).isRequired,
};
