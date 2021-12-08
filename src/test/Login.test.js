import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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
      userEvent.type(inputEmail, 'email@email.com');
      userEvent.type(inputPassword, '1234567');
      expect(buttonLogin).not.toBeDisabled();
    });
});
