import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import copy from 'clipboard-copy';

import optionsObject from '../utils/optionsObject';
import RecipesContext from '../context/RecipesContext';

function ReceitasProcesso(props) {
  const { match: { params: { id }, path } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const verifyAlcoholic = receipes === 'meal' ? 'strCategory' : 'strAlcoholic';
  const { idType, image, recipeType, name, area,
    category, alcoholic } = optionsObject[receipes];

  const { response, allMeasures, instruction, ingredients } = useContext(RecipesContext);

  const [checked, setChecked] = useState([]);
  const [share, setShare] = useState('');

  function handleFavorite(returnAPI) {
    const newRecipes = {
      id: returnAPI[idType],
      type: receipes,
      category: returnAPI[category],
      name: returnAPI[name],
      image: returnAPI[image],
      area: returnAPI[area],
      alcoholicOrNot: returnAPI[alcoholic],
    };
    const getFavorite = localStorage.getItem('favoriteRecipes');
    const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favoritesReceipes, { ...newRecipes }]),
    );
  }

  function handleInput(e) {
    if (checked.includes(e)) {
      setChecked(checked.filter((itemName) => itemName !== e));
    } else {
      setChecked([...checked, e]);
    }
  }

  function handleShare() {
    copy(window.location.href);
    setShare('Link copiado!');
  }

  return (
    <section className="settingDetailsReceipes">
      {(response && response[recipeType])
            && (
              <div>
                <img
                  data-testid="recipe-photo"
                  width="100px"
                  src={ response[recipeType][0][image] }
                  alt="Imagem Receita"
                />
                <h2 data-testid="recipe-title">{response[recipeType][0][name]}</h2>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => handleShare() }
                >
                  Compartilhar
                </button>
                {share && <p>{share}</p>}
                <button
                  type="button"
                  data-testid="favorite-btn"
                  onClick={ () => handleFavorite(response[recipeType][0]) }
                >
                  Favoritar
                </button>
                <h4 data-testid="recipe-category">
                  {response[recipeType][0][verifyAlcoholic]}
                </h4>
                <section>
                  <label htmlFor="ingredient-step">
                    {ingredients && ingredients.map((itens, index) => (
                      <label htmlFor={ itens } key={ itens }>
                        <input
                          data-testid={ `${index}-ingredient-step` }
                          type="checkbox"
                          name={ itens }
                          value={ checked }
                          id={ itens }
                          onChange={ () => handleInput(itens) }
                        />
                        <p
                          className={ checked.includes(itens)
                            ? 'settingReceipesProcessOK' : 'settingReceipesProcessNOK' }
                        >
                          {`${itens} - ${allMeasures[index]}`}
                        </p>
                      </label>
                    ))}
                  </label>
                </section>
                <h4>Instructions</h4>
                <p data-testid="instructions" key={ id }>
                  {instruction}
                </p>
              </div>
            )}
      <button
        className="settingDetailsReceipesButton"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </section>
  );
}

export default ReceitasProcesso;

ReceitasProcesso.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      includes: PropTypes.func,
    }),
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
