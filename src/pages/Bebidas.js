import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  return (
    <div className="settingDrinks">
      <Header objectProps={ optionsObject.drink } />
      <Footer />
    </div>
  );
}

export default Bebidas;
