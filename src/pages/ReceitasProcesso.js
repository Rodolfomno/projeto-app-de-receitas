import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';

import optionsObject from '../utils/optionsObject';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/ShareButton';

function ReceitasProcesso(props) {
  const { match: { params: { id }, path } } = props;
  const typeOfReceipes = path.includes('comidas') ? 'meal' : 'cocktail';
  const receipes = typeOfReceipes === 'meal' ? 'meal' : 'drink';
  const verifyAlcoholic = receipes === 'meal' ? 'strCategory' : 'strAlcoholic';
  const { image, recipeType, name } = optionsObject[receipes];

  const { setFinish, finish, response,
    setNewData, allMeasures, instruction, ingredients } = useContext(RecipesContext);
  const [checked, setChecked] = useState([]);

  function handleInput(e) {
    if (checked.includes(e)) {
      setChecked(checked.filter((itemName) => itemName !== e));
    } else {
      setChecked([...checked, e]);
    }
  }
  function handleClickFinish() {
    // Referencia da data: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    console.log('data', dataAtual);
    setNewData(dataAtual);
    setFinish(finish === undefined ? 'true' : undefined);
  }
  return (
    <section className="settingDetailsReceipes">
      {(response && response[recipeType])
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
                <section>
                  <label htmlFor="ingredient-step">
                    {ingredients && ingredients.map((itens, index) => (
                      <label htmlFor={ itens } key={ itens }>
                        <input
                          data-testid={ `${index}-ingredient-step` }
                          type="checkbox"
                          name={ itens }
                          value={ checked }
                          id={ itens }
                          onChange={ () => handleInput(itens) }
                        />
                        <p
                          className={ checked.includes(itens)
                            ? 'settingReceipesProcessOK' : 'settingReceipesProcessNOK' }
                        >
                          {`${itens} - ${allMeasures[index]}`}
                        </p>
                      </label>
                    ))}
                  </label>
                </section>
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
        onClick={ () => handleClickFinish() }
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
