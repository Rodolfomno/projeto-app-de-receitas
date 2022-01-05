import React, { useContext } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Cards from '../components/Cards';

function Comidas() {
  const { globalData } = useContext(RecipesContext);
  return (
    <div className="settingFood">
      <Header objectProps={ optionsObject.meal } />
      <Cards test={ globalData } />
      <Footer />
    </div>
  );
}
export default Comidas;
