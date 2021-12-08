import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe.skip('Testes da Página de Login', () => {
  test('Verifica se existe o campo login, senha e botão de login', () => {
    const { getPlaceholderText, getByText } = renderWithRouter(<App />);
    const inputEmail = getPlaceholderText(/email/i);
    const inputPassword = getPlaceholderText(/senha/i);
    const buttonLogin = getByText(/entrar/i);
    expect(buttonLogin).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se após os valores serem passados aos inputs o botão é habilitado',
    () => {
      const { getPlaceholderText, getByText } = renderWithRouter(<App />);
      const inputEmail = getPlaceholderText(/email/i);
      const inputPassword = getPlaceholderText(/senha/i);
      const buttonLogin = getByText(/entrar/i);
      expect(buttonLogin).toBeDisabled();
      userEvent.type(inputEmail, 'email@email.com');
      userEvent.type(inputPassword, '1234567');
      expect(buttonLogin).not.toBeDisabled();
    });
});
