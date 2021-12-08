import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const condition = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const MIN_LENGTH_PASSWORD = 6;
    if (login.email !== undefined && login.password !== undefined) {
      const test = condition.test(login.email);
      const test2 = login.password.length > MIN_LENGTH_PASSWORD;
      setIsDisabled(!(test && test2));
    }
  }, [login]);

  const handleInputChange = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/comidas');
  };

  return (
    <div>
      <form onSubmit={ (e) => handleClick(e) }>
        <div><h3>Login</h3></div>
        <label htmlFor="email">
          <input
            name="email"
            value={ login.email }
            onChange={ handleInputChange }
            data-testid="email-input"
            type="email"
            placeholder="email"
            required
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            value={ login.password }
            onChange={ handleInputChange }
            data-testid="password-input"
            type="password"
            placeholder="senha"
            required
          />
        </label>
        <label htmlFor="button">
          <input
            data-testid="login-submit-btn"
            type="submit"
            required
            value="Entrar"
            disabled={ isDisabled }
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
