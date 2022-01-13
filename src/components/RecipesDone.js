import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const testDoneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function RecipesDoneCard() {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [share, setShare] = useState('');

  useEffect(() => {
    // setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    // setFilteredDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setDoneRecipes(testDoneRecipes);
    setFilteredDoneRecipes(testDoneRecipes);
  }, [setFilteredDoneRecipes, setDoneRecipes]);

  const handleClickCategories = (clickedCategory) => {
    if (clickedCategory === 'all') {
      setFilteredDoneRecipes(doneRecipes);
    } else {
      const filtered = doneRecipes.filter((item) => item.type === clickedCategory);
      setFilteredDoneRecipes(filtered);
      console.log('click2', filtered);
    }
  };

  function handleShare(e) {
    copy(`http://localhost:3000/comidas/${e.target.id}`);
    setShare('Link copiado!');
  }

  function caminhoDetalhes(item) {
    if (item.type === 'comida') {
      history.push(`comidas/${item.id}`);
    } else {
      history.push(`bebidas/${item.id}`);
    }
  }

  return (
    <div>
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
          onClick={ () => handleClickCategories('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickCategories('bebida') }
        >
          Drinks
        </button>
      </div>
      <ul>
        { filteredDoneRecipes.map((item, index) => (
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
            <Link
              to={ item.type === 'meal'
                ? (`/comidas/${item.id}`) : (`/bebidas/${item.id}`) }
            >
              <p
                data-testid={ `${index}-horizontal-name` }
                className="done-recipe-name"
              >
                { item.name }
              </p>
            </Link>
            <button
              type="button"
              onClick={ (e) => handleShare(e) }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              id={ item.id }
            >

              <img
                data-testid="profile-top-btn"
                src={ shareIcon }
                alt="Compartilhar"
              />
              Compartilhar
            </button>
            {share && <p>{share}</p>}
            { item.tags.map((tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                className="done-recipe-tag"
                key={ tag }
              >
                { tag }
              </p>
            )) }
            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="done-recipe-date"
            >
              Feita em:
              { item.doneDate }
              data de conclusão da receita
            </p>
          </li>
        )) }
      </ul>

      {/* <img
        data-testid={ `${index}-horizontal-image` }
        alt={ index.name }
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
      )) } */}
    </div>
  );
}

export default RecipesDoneCard;
