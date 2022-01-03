import React from 'react';
import { Link } from 'react-router-dom';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div className="settingExplorar">
      <Header objectProps={ optionsObject.explore } />
      <section className="settingExplorarContainer">
        <Link to="/explorar/comidas" className="settingExplorarLinks">
          Explorar Comidas
        </Link>
        <Link to="/explorar/bebidas" className="settingExplorarLinks">
          Explorar Bebidas
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Explorar;
