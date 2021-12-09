import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Menu inferior deve ter os atributos descritos no protótipo', () => {
  test.skip('O menu inferior deve ter possuir o atributo data-testid="footer"', () => {
    const { getByTestId, history } = renderWithRouter(
      <App />,
    );

    history.push('/comidas');
    const bottomMenu = getByTestId('footer');
    expect(bottomMenu).toBeInTheDocument();
  });

  test.skip('O elemento que leva para a página de comidas deve possuir o'
  + ' atributo data-testid="food-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(
      <App />,
    );

    history.push('/comidas');
    const foodBtn = getByTestId('food-bottom-btn');
    expect(foodBtn).toBeInTheDocument();
  });

  test.skip('O elemento que leva para a página de explorar deve possuir o'
  + ' atributo data-testid="explore-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(
      <App />,
    );

    history.push('/comidas');
    const exploreBtn = getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
  });

  test.skip('O elemento que leva para a página de drinks deve possuir o'
  + ' atributo data-testid="drinks-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(
      <App />,
    );

    history.push('/comidas');
    const drinksBtn = getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
  });
});

describe('Redireciona o usuário para a página correta conforme o botão clicado no footer',
  () => {
    test.skip('Redirecione a pessoa usuária para uma lista de comidas'
    + 'ao clicar no ícone de comidas', () => {
      const { getByTestId, history } = renderWithRouter(
        <App />,
      );

      history.push('/comidas');
      const foodBtn = getByTestId('food-bottom-btn');
      fireEvent.click(foodBtn);

      expect(history.location.pathname).toBe('/comidas');
    });

    test.skip('Redirecione a pessoa usuária para uma lista de bebidas'
    + 'ao clicar no ícone de bebidas', () => {
      const { getByTestId, history } = renderWithRouter(
        <App />,
      );

      history.push('/comidas');
      const drinkBtn = getByTestId('drinks-bottom-btn');
      fireEvent.click(drinkBtn);

      expect(history.location.pathname).toBe('/bebidas');
    });

    test.skip('Redirecione a pessoa usuária para a tela de explorar'
    + 'ao clicar no ícone de exploração', () => {
      const { getByTestId, history } = renderWithRouter(
        <App />,
      );

      history.push('/comidas');
      const exploreBtn = getByTestId('explore-bottom-btn');
      fireEvent.click(exploreBtn);

      expect(history.location.pathname).toBe('/explorar');
    });
  });
