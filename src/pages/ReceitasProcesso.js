import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';

function ReceitasProcesso(props) {
  const { match: { params: { id }, path } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const verifyAlcoholic = receipes === 'meal' ? 'strCategory' : 'strAlcoholic';
  const [response, setResponse] = useState({});
/*   const [ingredients, setIngredients] = useState('');
  const [allMeasures, setAllMeasures] = useState(''); */
  const [instruction, setInstruction] = useState('');

  const { image, API_URL_TYPE, recipeType, name } = optionsObject[receipes];

  useEffect(() => {
    async function requestDetailReceipes() {
      const dataDetails = await fetchAPI(`https://www.the${API_URL_TYPE}db.com/api/json/v1/1/lookup.php?i=${id}`);
      setResponse(dataDetails);

      const allDataOfReceipe = (dataDetails[recipeType][0]);
      const allIngredientes = (Object.keys(allDataOfReceipe).map(
        (item) => item.includes('strIngredient') && allDataOfReceipe[item],
      ).filter((item) => (item !== '' && item !== false) && item));
      const allMeasure = (Object.keys(allDataOfReceipe).map(
        (item) => item.includes('strMeasure') && allDataOfReceipe[item],
      ).filter((item) => (item !== '' && item !== false) && item));
      const instructions = dataDetails[recipeType][0].strInstructions;
      setIngredients(allIngredientes);
      setInstruction(instructions);
      setAllMeasures(allMeasure);
    }
    requestDetailReceipes();
  }, [verifyAPIRecomendations, id]);

  return (
    <section className="settingDetailsReceipes">
      {response[recipeType]
            && (
              <div>
                <img
                  data-testid="recipe-photo"
                  width="100px"
                  src={ response[recipeType][0][image] }
                  alt="Imagem Receita"
                />
                <h2 data-testid="recipe-title">{response[recipeType][0][name]}</h2>
                <button type="button" data-testid="share-btn">Compartilhar</button>
                <button type="button" data-testid="favorite-btn">Favoritar</button>
                <h4 data-testid="recipe-category">
                  {response[recipeType][0][verifyAlcoholic]}
                </h4>

                {/*                 <section>
                  <label htmlFor="ingredient-step">
                    {ingredients && ingredients.map((itens, index) => (

                      <input
                        data-testid={ `${index}-ingredient-step` }
                        type="checkbox"
                        name={ itens }
                        value={ itens }
                        id="ingredient-step"
                      >
                        {`${itens} - ${allMeasures[index]}`}
                      </input>

                   ))}
                  </label>
                </section> */}

                <h4>Instructions</h4>
                <p data-testid="instructions" key={ id }>
                  {instruction}
                </p>
              </div>
            )}
      <button
        className="settingDetailsReceipesButton"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClickStartReceipe }
      >
        Finalizar Receita
      </button>
    </section>
  );
}

export default ReceitasProcesso;

ReceitasProcesso.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      includes: PropTypes.func,
    }),
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
