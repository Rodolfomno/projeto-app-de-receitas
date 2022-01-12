import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesFavorite() {
  const history = useHistory();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);
  const [share, setShare] = useState('');

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setFilteredFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const handleClickCategories = (clickedCategory) => {
    console.log('click', clickedCategory);
    if (clickedCategory === 'all') {
      setFilteredFavoriteRecipes(favoriteRecipes);
    } else {
      const filtered = favoriteRecipes.filter((item) => item.type === clickedCategory);
      setFilteredFavoriteRecipes(filtered);
    }
  };

  // function handleUnfavorite(id) {
  //   setFavoriteRecipes(favoriteRecipes
  //     .filter((favoriteRecipe) => favoriteRecipe.id !== id));
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  // }

  function handleUnfavorite(id) {
    console.log('favorite', favoriteRecipes);
    const exclui = favoriteRecipes
      .filter((favoriteRecipe) => favoriteRecipe.id !== id);
    console.log('exclui', exclui);
    // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  function handleShare(e) {
    console.log('clickComp', e.target.id);
    copy(`http://localhost:3000/comidas/${e.target.id}`);
    setShare('Link copiado!');
  }

  function caminhoDetalhes(item) {
    if (item.type === 'meal') {
      history.push(`comidas/${item.id}`);
    } else {
      history.push(`bebidas/${item.id}`);
    }
  }
  console.log('favoritos localStorage', filteredFavoriteRecipes);
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
        { filteredFavoriteRecipes.map((item, index) => (
          <li key={ index }>
            <button
              type="button"
              onClick={ () => caminhoDetalhes(item) }
            >
              <img
                width="100px"
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt={ item.name }
                className="done-recipe-category"
              />
            </button>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="done-recipe-category"
            >
              { item.alcoholicOrNot === 'Alcoholic'
                ? `${item.alcoholicOrNot} - ${item.category}`
                : `${item.area} - ${item.category}` }
            </p>
            <button
              data-testid={ `${index}-horizontal-name` }
              type="button"
              onClick={ () => caminhoDetalhes(item) }
            >
              <p
                className="done-recipe-name"
              >
                { item.name }
              </p>
            </button>
            <button
              type="button"
              onClick={ (e) => handleShare(e) }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              id={ item.id }
            >
              {/*
              <img data-testid="profile-top-btn"
              src={ shareIcon } alt="Compartilhar" /> */}
              Compartilhar
            </button>
            {share && <p>{share}</p>}
            <button
              type="button"
              onClick={ () => handleUnfavorite(item.id) }
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
            >
              <img
                data-testid="profile-top-btn"
                src={ blackHeartIcon }
                alt="Desfavoritar"
              />
            </button>
          </li>
        )) }
      </ul>
    </>
  );
}

export default RecipesFavorite;
