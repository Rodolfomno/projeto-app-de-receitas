import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';
import Cards from '../components/Cards';
import RecipesContext from '../context/RecipesContext';

function DetalhesReceitas(props) {
  const { match: { params: { id }, path, url } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const verifyAlcoholic = receipes === 'meal' ? 'strCategory' : 'strAlcoholic';

  const { setResponse, response, allMeasures, setAllMeasures,
    instruction, setInstruction, ingredients,
    setIngredients } = useContext(RecipesContext);

  const [recomendations, setRecomendations] = useState({});
  const [video, setVideo] = useState('');
  const [share, setShare] = useState('');

  const { image, API_URL_TYPE, recipeType, name, idType, area,
    category, alcoholic } = optionsObject[receipes];

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
      setRecomendations(dataRecomendation);
    }
    requestDetailReceipes();
  }, [verifyAPIRecomendations, id]);

  function handleFavorite(returnAPI) {
    const newRecipes = {
      id: returnAPI[idType],
      type: receipes,
      category: returnAPI[category],
      name: returnAPI[name],
      image: returnAPI[image],
      area: returnAPI[area],
      alcoholicOrNot: returnAPI[alcoholic],
    };
    const getFavorite = localStorage.getItem('favoriteRecipes');
    const favoritesReceipes = getFavorite ? JSON.parse(getFavorite) : [];
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favoritesReceipes, { ...newRecipes }]),
    );
  }

  function handleShare() {
    copy(window.location.href);
    setShare('Link copiado!');
  }

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
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => handleShare() }
                >
                  Compartilhar
                </button>
                {share && <p>{share}</p>}
                <button
                  type="button"
                  data-testid="favorite-btn"
                  onClick={ () => handleFavorite(response[recipeType][0]) }
                >
                  Favoritar
                </button>
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
