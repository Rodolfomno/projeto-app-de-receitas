import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';
import Cards from '../components/Cards';

function DetalhesReceitas(props) {
  const { match: { params: { id }, path } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const [response, setResponse] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [video, setVideo] = useState('');

  const { image, API_URL_TYPE, recipeType,
    name, category, alcoholic } = optionsObject[receipes];
  const verifyAlcoholic = receipes === 'meal' ? category : alcoholic;

  const verifyAPIRecomendations = typeOfReceipes === 'meal' ? 'cocktail' : 'meal';
  const acessOptions = typeOfReceipes === 'meal' ? 'drink' : 'meal';
  const verifyCategory = receipes === 'meal' ? 'strAlcoholic' : 'strCategory';

  const refactoryCondition = (dataDetails) => {
    const INITIAL_LINK = 24;
    const END_LINK = 32;
    const allDataOfReceipe = (dataDetails[0]);
    const allIngredientes = (Object.keys(allDataOfReceipe).map(
      (item) => item.includes('strIngredient') && allDataOfReceipe[item],
    ).filter((item) => (item !== '' && item !== false) && item));
    const instructions = (Object.keys(allDataOfReceipe).map(
      (item) => item.includes('strInstructions') && allDataOfReceipe[item],
    ).filter((item) => (item !== '' && item !== false) && item));
    const videos = String(Object.keys(allDataOfReceipe).map(
      (item) => item.includes('strYoutube') && allDataOfReceipe[item],
    ).filter((item) => (item !== '' && item !== false) && item));
    const settingvideos = (
      `${videos.substring(0, INITIAL_LINK)}embed/${videos.substring(END_LINK)}`);
    setIngredients(allIngredientes);
    setInstruction(instructions);
    setVideo(settingvideos);
  };

  useEffect(() => {
    async function requestDetailReceipes() {
      const dataDetails = await fetchAPI(`https://www.the${API_URL_TYPE}db.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataRecomendation = await fetchAPI(`https://www.the${verifyAPIRecomendations}db.com/api/json/v1/1/search.php?s=`);
      setResponse(dataDetails);
      setRecomendations(dataRecomendation);
      if (dataDetails[recipeType]) {
        refactoryCondition(dataDetails[recipeType]);
      }
    }
    requestDetailReceipes();
  }, []);

  return (
    <section>
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
                <ul>
                  {ingredients && ingredients.map((itens, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ id }
                    >
                      {itens}
                    </li>))}
                </ul>
                <div>
                  <h4>Instructions</h4>
                  <p data-testid="instructions" key={ id }>
                    {instruction}
                  </p>
                </div>
                {(video && API_URL_TYPE === 'meal') && (
                  <iframe
                    data-testid="video"
                    width="300"
                    src={ video }
                    title="YouTube Video"
                  />)}
              </div>
            )}
      <Cards
        test={ recomendations }
        objectProps={ optionsObject[acessOptions] }
        categoryAlcoholic={ verifyCategory }
      />
      <button type="button" data-testid="start-recipe-btn">Iniciar</button>
    </section>
  );
}

export default DetalhesReceitas;

DetalhesReceitas.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      includes: PropTypes.func,
    }),
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
