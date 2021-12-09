import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL = 'email@email.com';
const PASSWORD = '1234567';

describe('Testes da Página de Login', () => {
  test('Verifica se existe o campo login, senha e botão de login', () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(<App />);
    const inputEmail = getByPlaceholderText(/email/i);
    const inputPassword = getByPlaceholderText(/senha/i);
    const buttonLogin = getByText(/entrar/i);
    expect(buttonLogin).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se após os valores serem passados aos inputs o botão é habilitado',
    () => {
      const { getByPlaceholderText, getByText } = renderWithRouter(<App />);
      const inputEmail = getByPlaceholderText(/email/i);
      const inputPassword = getByPlaceholderText(/senha/i);
      const buttonLogin = getByText(/entrar/i);
      expect(buttonLogin).toBeDisabled();
      userEvent.type(inputEmail, EMAIL);
      userEvent.type(inputPassword, PASSWORD);
      expect(buttonLogin).not.toBeDisabled();
    });

  test('Verifica se ao cliclar em Entrar, muda rota para'
    + ' Comidas e envia para LocalStorage', () => {
    const { getByPlaceholderText, getByText, history } = renderWithRouter(<App />);
    const inputEmail = getByPlaceholderText(/email/i);
    const inputPassword = getByPlaceholderText(/senha/i);

    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);

    const buttonLogin = getByText(/entrar/i);
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/comidas');

    const tokenMeals = localStorage.getItem('mealsToken');
    expect(tokenMeals).toBe(1);
    const tokenCocktails = localStorage.getItem('cocktailsToken');
    expect(tokenCocktails).toBe(1);

    const email = localStorage.getItem('user');
    expect(email).objectContain('email@email.com');
  });
});
