import React from 'react';
import { useHistory } from 'react-router-dom';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  const history = useHistory();

  const handleClickExploreDrinksByIngredient = () => {
    history.push(optionsObject.exploreDrinksByIngredients.pagePath);
  };

  const handleClickExploreRandomDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    const { idDrink } = drinks[0];
    history.push(`${optionsObject.drink.pagePath}/${idDrink}`);
  };

  return (
    <div className="settingExplorarBebidas">
      <Header objectProps={ optionsObject.exploreDrinks } />

      <section className="settingExplorarContainer">
        <button
          type="button"
          onClick={ handleClickExploreDrinksByIngredient }
          data-testid="explore-by-ingredient"
          className="settingExplorarButtons"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          className="settingExplorarButtons"
          onClick={ handleClickExploreRandomDrink }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
