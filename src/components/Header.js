import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchAPI from '../utils/fetchAPI';

function Header(props) {
  const { pageTitle } = props;
  const [isHiddenSearch, setIsHiddenSearch] = useState(true);

  const handleSearchClick = () => { setIsHiddenSearch(!isHiddenSearch); };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let filteredURL = '';
    let response = '';
    const BASE_API_URL = `https://www.the${pageTitle === 'Comidas' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/search.php?`;
    const selectedFilter = document.querySelector('input[name="search-filter"]:checked');
    const inputValue = document.querySelector('input[name="search-input"]').value;

    if (selectedFilter.value === 'Ingrediente') {
      filteredURL = `https://www.the${pageTitle === 'Comidas' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/filter.php?i=${inputValue}`;
    } else if (selectedFilter.value === 'Nome') {
      filteredURL = `${BASE_API_URL}s=${inputValue}`;
    } else if (selectedFilter.value === 'Primeira letra') {
      if (inputValue.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      filteredURL = `${BASE_API_URL}f=${inputValue}`;
    }
    response = fetchAPI(filteredURL);
    console.log(Object.values(response));
    return response;
  };

  return (
    <header>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
      </Link>
      <h1 data-testid="page-title">{ pageTitle }</h1>
      <button type="button" onClick={ handleSearchClick }>
        <img data-testid="search-top-btn" src={ searchIcon } alt="Buscar" />
      </button>
      { !isHiddenSearch && (
        <div>
          <input data-testid="search-input" name="search-input" />
          <label htmlFor="ingredient-search-radio">
            Ingrediente
            <input
              type="radio"
              name="search-filter"
              value="Ingrediente"
              data-testid="ingredient-search-radio"
              id="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name-search-radio">
            Nome
            <input
              type="radio"
              name="search-filter"
              value="Nome"
              data-testid="name-search-radio"
              id="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter-search-radio">
            Primeira letra
            <input
              type="radio"
              name="search-filter"
              value="Primeira letra"
              data-testid="first-letter-search-radio"
              id="first-letter-search-radio"
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleSearchSubmit }
          >
            Buscar
          </button>
        </div>
      ) }
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
