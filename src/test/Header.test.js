import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa os headers de comidas e bebidas', () => {
  const { getByTestId, history } = renderWithRouter(<App />);
  const h1 = getByTestId('page-title');
  const searchButton = getByTestId('search-top-btn');
  const profileButton = getByTestId('profile-top-btn');

  test.skip('Possui inputs do profile e search, além do H1 na página de Comidas', () => {
    history.push('/comidas');

    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Comidas');

    expect(searchButton).toBeInTheDocument();

    expect(profileButton).toBeInTheDocument();
  });

  test.skip('Possui inputs do profile e search, além do H1 na página de Bebidas', () => {
    history.push('/bebidas');

    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Bebidas');

    expect(searchButton).toBeInTheDocument();

    expect(profileButton).toBeInTheDocument();
  });

  test.skip('Redireciona para a página de pefil ao clicar no ícone de perfil', () => {
    history.push('/comidas');

    expect(profileButton).toBeInTheDocument();

    fireEvent.click(profileButton);
    expect(history.location.pathname).toBe('/perfil');

    expect(h1).toHaveTextContent('Perfil');
  });

  test.skip('O input de busca aparece após clicar no ícone de buscar', () => {
    history.push('/comidas');

    fireEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
  });
});
