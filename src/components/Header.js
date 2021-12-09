import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { pageTitle } = props;
  const [isHiddenSearch, setIsHiddenSearch] = useState(true);

  const handleSearchClick = () => { setIsHiddenSearch(!isHiddenSearch); };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let filteredURL = '';
    const BASE_API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    const selectedFilter = document.querySelector('input[name="search-filter"]:checked');
    const inputValue = document.querySelector('input[name="search-input"]').value;

    if (selectedFilter.value === 'Ingrediente') {
      filteredURL = `${BASE_API_URL}i=${inputValue}`;
    }
    console.log(filteredURL);
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
