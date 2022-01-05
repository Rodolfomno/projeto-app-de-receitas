import React, { useContext } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Cards from '../components/Cards';

function Bebidas() {
  const { globalData } = useContext(RecipesContext);
  return (
    <div className="settingDrinks">
      <Header objectProps={ optionsObject.drink } />
      <Cards test={ globalData } objectProps={ optionsObject.drink } />
      <Footer />
    </div>
  );
}

export default Bebidas;
