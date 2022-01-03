import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  return (
    <div className="settingExplorarBebidas">
      <Header objectProps={ optionsObject.exploreDrinks } />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
