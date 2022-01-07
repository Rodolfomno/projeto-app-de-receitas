import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import optionsObject from '../utils/optionsObject';

function DetalhesReceitas(props) {
  const { match: { params: { id }, path } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const [response, setResponse] = useState({});
  /*   const [receipe, setReceipes] = useState(''); */
  /*   const lastIndex = -1; */

  const { image, API_URL_TYPE, recipeType, name, category } = optionsObject[receipes];

  useEffect(() => {
    async function requestDetailReceipes() {
      /*       setReceipes(typeOfReceipes === 'meal' ? 'meals' : 'drinks'); */
      const dataDetails = await fetchAPI(`https://www.the${API_URL_TYPE}db.com/api/json/v1/1/lookup.php?i=${id}`);
      setResponse(dataDetails);
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
                {console.log(response[recipeType].reduce((acc, curr) => {
                  console.log(typeof curr, 'curr');
                  curr.forEach((element) => {
                    console.log(element, 'element');
                    if (element.includes('strIngredient')) acc.push(element);
                  });
                  return acc;
                }, []))}
                {/* {response[recipeType].filter((item) => item.includes('strIngredient') && item)
                  .map((ingredient, index) => (
                    <p
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ ingredient }
                    >
                      {ingredient}
                    </p>))} */}
                <button type="button" data-testid="start-recipe-btn">Iniciar</button>
                {/*                 <div data-testid={ `${index}-recomendation-card` }>Receita</div>
                <video src={ response[recipeType][0][strVideo] } data-testid="instructions" /> */}
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
