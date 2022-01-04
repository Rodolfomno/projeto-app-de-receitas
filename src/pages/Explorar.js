import React from 'react';
import { useHistory } from 'react-router-dom';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  const history = useHistory();

  const handleClickExploreMeal = () => {
    history.push(optionsObject.exploreMeal.pagePath);
  };

  const handleClickExploreDrinks = () => {
    history.push(optionsObject.exploreDrinks.pagePath);
  };

  return (
    <div className="settingExplorar">
      <Header objectProps={ optionsObject.explore } />
      <section className="settingExplorarContainer">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ handleClickExploreMeal }
          className="settingExplorarButtons"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ handleClickExploreDrinks }
          className="settingExplorarButtons"
        >
          Explorar Bebidas
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Explorar;
