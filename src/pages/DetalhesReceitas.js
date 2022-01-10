import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';

function DetalhesReceitas(props) {
  const { match: { params: { id }, path } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const [response, setResponse] = useState({});
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [video, setVideo] = useState('');

  const { image, API_URL_TYPE, recipeType, name, category } = optionsObject[receipes];

  useEffect(() => {
    async function requestDetailReceipes() {
      const dataDetails = await fetchAPI(`https://www.the${API_URL_TYPE}db.com/api/json/v1/1/lookup.php?i=${id}`);
      const INITIAL_LINK = 24;
      const END_LINK = 32;
      setResponse(dataDetails);
      if (dataDetails[recipeType]) {
        const allDataOfReceipe = (dataDetails[recipeType][0]);
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
        console.log(settingvideos);
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
                <h4 data-testid="recipe-category">{response[recipeType][0][category]}</h4>
                <ul>
                  {ingredients && ingredients.map((itens, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ id }
                    >
                      {itens}
                    </li>
                  ))}
                </ul>
                {instruction && (
                  <p data-testid="instructions" key={ id }>
                    {instruction}
                  </p>)}
                {video && (
                  <iframe
                    data-testid="video"
                    width="300"
                    src={ video }
                    title="YouTube Video"
                  />
                )}
                {/*                 <div data-testid={ `${index}-recomendation-card` }>Receita</div>
                 */}
                <button type="button" data-testid="start-recipe-btn">Iniciar</button>
              </div>
            )}
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
