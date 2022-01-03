import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  return (
    <div className="settingFood">
      <Header objectProps={ optionsObject.meal } />
      <Footer />
    </div>
  );
}
export default Comidas;
