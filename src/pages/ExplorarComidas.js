import React from 'react';
import { useHistory } from 'react-router-dom';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  const history = useHistory();

  const handleClickExploreMealsByIngredient = () => {
    history.push(optionsObject.exploreMealsByIngredients.pagePath);
  };

  const handleClickExploreMealsByArea = () => {
    history.push(optionsObject.exploreMealsByArea.pagePath);
    console.log('objeto', optionsObject.exploreMealsByArea.pagePath);
  };

  const handleClickExploreRandomMeal = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await response.json();
    const { idMeal } = meals[0];
    history.push(`${optionsObject.meal.pagePath}/${idMeal}`);
  };

  return (
    <div className="settingExplorarBebidas">
      <Header objectProps={ optionsObject.exploreMeal } />

      <section className="settingExplorarContainer">
        <button
          type="button"
          onClick={ handleClickExploreMealsByIngredient }
          data-testid="explore-by-ingredient"
          className="settingExplorarButtons"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          onClick={ handleClickExploreMealsByArea }
          data-testid="explore-by-area"
          className="settingExplorarButtons"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          className="settingExplorarButtons"
          onClick={ handleClickExploreRandomMeal }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
