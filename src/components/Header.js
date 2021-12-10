import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchAPI from '../utils/fetchAPI';

function Header(props) {
  const { objectProps } = props;
  const { pageTitle, pagePath, API_URL_TYPE, recipeType, idType } = objectProps;
  const [isHiddenSearch, setIsHiddenSearch] = useState(true);
  const [data, setData] = useState({});
  const history = useHistory();

  const getId = () => {
    if (data[recipeType] === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (data[recipeType].length === 1) {
      const recipeId = data[recipeType][0][idType];
      console.log(recipeId);
      return recipeId;
    }
  };
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const recipeId = getId();
      history.push(`${pagePath}/${recipeId}`);
    }
  }, [data]);

  const handleSearchClick = () => { setIsHiddenSearch(!isHiddenSearch); };
  const generateURL = () => {
    let filteredURL = '';
    const BASE_API_URL = `https://www.the${API_URL_TYPE}db.com/api/json/v1/1/search.php?`;
    const selectedFilter = document.querySelector('input[name="search-filter"]:checked');
    const inputValue = document.querySelector('input[name="search-input"]').value;
    if (selectedFilter.value === 'Ingrediente') {
      filteredURL = `https://www.the${API_URL_TYPE}db.com/api/json/v1/1/filter.php?i=${inputValue}`;
    } else if (selectedFilter.value === 'Nome') {
      filteredURL = `${BASE_API_URL}s=${inputValue}`;
    } else if (selectedFilter.value === 'Primeira letra') {
      if (inputValue.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      filteredURL = `${BASE_API_URL}f=${inputValue}`;
    }
    return filteredURL;
  };
  console.log(data);
  const handleSearchSubmit = async () => {
    const URL = generateURL();
    const response = await fetchAPI(URL);
    if (response !== undefined) {
      setData(response);
    }
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
  objectProps: PropTypes.shape({
    API_URL_TYPE: PropTypes.string,
    idType: PropTypes.string,
    pagePath: PropTypes.string,
    pageTitle: PropTypes.string,
    recipeType: PropTypes.string,
  }).isRequired,
};

export default Header;
