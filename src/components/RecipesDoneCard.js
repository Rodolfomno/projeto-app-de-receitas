import PropTypes from 'prop-types';
import React from 'react';

function RecipesDoneCard({ test, index }) {
  return (
    <div>
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
      { test[tags].map((tag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          className="done-recipe-tag"
          key={ tag }
        >
          { tag }
        </p>
      )) }
    </div>
  );
}
RecipesDoneCard.propTypes = {
  index: PropTypes.number.isRequired,
  test: PropTypes.shapeOf({
    type: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default RecipesDoneCard;
