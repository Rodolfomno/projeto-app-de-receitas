import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';
import Cards from '../components/Cards';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/ShareButton';

function DetalhesReceitas(props) {
  const { match: { params: { id }, path, url } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const verifyAlcoholic = receipes === 'meal' ? 'strCategory' : 'strAlcoholic';

  const { setResponse, response, allMeasures, setAllMeasures,
    instruction, setInstruction, ingredients,
    setIngredients, setReceipe, receipe } = useContext(RecipesContext);

  const [recomendations, setRecomendations] = useState({});
  const [video, setVideo] = useState('');

  const { image, API_URL_TYPE, recipeType, name } = optionsObject[receipes];

  const verifyAPIRecomendations = typeOfReceipes === 'meal' ? 'cocktail' : 'meal';
  const acessOptions = typeOfReceipes === 'meal' ? 'drink' : 'meal';
  const verifyCategory = receipes === 'meal' ? 'strAlcoholic' : 'strCategory';

  const INITIAL = 24;
  const END = 32;

  const history = useHistory();

  const handleClickStartReceipe = () => {
    history.push(`${url}/in-progress`);
  };

  useEffect(() => {
    async function requestDetailReceipes() {
      const dataDetails = await fetchAPI(`https://www.the${API_URL_TYPE}db.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataRecomendation = await fetchAPI(`https://www.the${verifyAPIRecomendations}db.com/api/json/v1/1/search.php?s=`);

      const allDataOfReceipe = (dataDetails[recipeType][0]);
      const allIngredientes = (Object.keys(allDataOfReceipe).map(
        (item) => item.includes('strIngredient') && allDataOfReceipe[item],
      ).filter((item) => (item !== '' && item !== false) && item));
      const allMeasure = (Object.keys(allDataOfReceipe).map(
        (item) => item.includes('strMeasure') && allDataOfReceipe[item],
      ).filter((item) => (item !== '' && item !== false) && item));
      const instructions = dataDetails[recipeType][0].strInstructions;
      const videos = dataDetails[recipeType][0].strYoutube;
      setIngredients(allIngredientes);
      setInstruction(instructions);
      setVideo(videos);
      setAllMeasures(allMeasure);
      setResponse(dataDetails);
      setReceipe(receipes);
      setRecomendations(dataRecomendation);
    }
    requestDetailReceipes();
  }, [verifyAPIRecomendations, id]);

  return (
    <section className="settingDetailsReceipes">
      {(response[recipeType] && receipe)
            && (
              <div>
                <img
                  data-testid="recipe-photo"
                  width="100px"
                  src={ response[recipeType][0][image] }
                  alt="Imagem Receita"
                />
                <h2 data-testid="recipe-title">{response[recipeType][0][name]}</h2>
                <ShareButton id={ id } />
                <h4 data-testid="recipe-category">
                  {response[recipeType][0][verifyAlcoholic]}
                </h4>
                <ul>
                  {ingredients.map((itens, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ id }
                    >
                      {`${itens} - ${allMeasures[index]}`}
                    </li>))}
                </ul>
                <h4>Instructions</h4>
                <p data-testid="instructions" key={ id }>
                  {instruction}
                </p>
                {(API_URL_TYPE === 'meal') && (
                  <iframe
                    data-testid="video"
                    width="300"
                    src={ `${video.substring(0, INITIAL)}embed/${video.substring(END)}` }
                    title="YouTube Video"
                  />)}
              </div>
            )}
      <div className="settingDetailsReceipesCards">
        <Cards
          test={ recomendations }
          objectProps={ optionsObject[acessOptions] }
          categoryAlcoholic={ verifyCategory }
        />
      </div>

      <button
        className="settingDetailsReceipesButton"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClickStartReceipe }
      >
        Iniciar
      </button>
    </section>
  );
}

export default DetalhesReceitas;

DetalhesReceitas.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      includes: PropTypes.func,
    }),
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
