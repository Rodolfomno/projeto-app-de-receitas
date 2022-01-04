import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [globalData, setGlobalData] = useState([]);
  async function useRequestAPI(URL) {
    const INITIALSTATE = [];
    const [data, setData] = useState(INITIALSTATE);

    useEffect(() => {
      fetch(URL)
        .then((response) => response.json())
        .then((test) => { setData(test); });
    }, [URL]);
    return [data];
  }

  const data = useRequestAPI();
  const value = {
    data,
    useRequestAPI,
    globalData,
    setGlobalData,
  };

  console.log(data);

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
