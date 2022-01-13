import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import optionsObject from '../utils/optionsObject';
import RecipesContext from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ShareButton({ id }) {
  const { response, receipe, setFavorite,
    favorite, setTest, test } = useContext(RecipesContext);

  const { /* idType, image, */ recipeType, /* , name, area,
    category, alcoholic  */ } = optionsObject[receipe];

  const [share, setShare] = useState('');
  /*  const [favorite, setFavorite] = useState(undefined); */

  useEffect(() => {
    const getFavorite = localStorage.getItem('favoriteRecipes');
    const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
    const filter = favoritesReceipes.some((item) => item.id === id);
    setFavorite(filter === true ? 'true' : undefined);
  }, []);

  /*   function handleFavorite(returnData) {
    if (favorite === undefined) {
      const newRecipes = {
        id: returnData[idType],
        type: receipe === 'drink' ? 'bebida' : 'comida',
        category: returnData[category],
        alcoholicOrNot: returnData[alcoholic],
        name: returnData[name],
        image: returnData[image],
        area: returnData[area],
      };
      const getFavorite = localStorage.getItem('favoriteRecipes');
      const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
      localStorage.setItem(
        'favoriteRecipes', JSON.stringify([...favoritesReceipes, { ...newRecipes }]),
      );
    } else {
      const getFavorite = localStorage.getItem('favoriteRecipes');
      const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
      const local = favoritesReceipes.filter((item) => item.id !== returnData[idType]);
      localStorage.setItem(
        'favoriteRecipes', JSON.stringify(local),
      );
    }
    setFavorite(favorite === undefined ? 'true' : undefined);
  } */

  function handleClick() {
    setTest(test === undefined ? 'true' : undefined);
  }

  function handleShare() {
    copy(window.location.href);
    setShare('Link copiado!');
  }

  return (
    <section className="settingDetailsReceipes">
      {(response && response[recipeType]) && (
        <div>
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
            onClick={ () => handleClick() }
            src={ favorite === undefined ? whiteHeartIcon : blackHeartIcon }
          >
            { favorite === undefined
              ? <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
              : <img src={ blackHeartIcon } alt="blackHeartIcon" />}
          </button>

        </div>
      )}
    </section>
  );
}

ShareButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareButton;
