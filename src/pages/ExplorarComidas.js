import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  return (
    <div className="settingExplorarBebidas">
      <Header objectProps={ optionsObject.exploreMeal } />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
