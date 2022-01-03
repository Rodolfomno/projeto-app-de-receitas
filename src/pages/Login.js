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
    <div className="settingLogin">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
      <form className="settingLoginForms" onSubmit={ (e) => handleClick(e) }>
        <div className="settingLoginContainer">
          <h3 className="settingLoginTitle">Login</h3>
        </div>
        <label className="settingLoginContainer" htmlFor="email">
          <input
            className="settingLoginInputs"
            name="email"
            value={ login.email }
            onChange={ handleInputChange }
            data-testid="email-input"
            type="email"
            placeholder="email"
            required
          />
        </label>
        <label className="settingLoginContainer" htmlFor="password">
          <input
            className="settingLoginInputs"
            name="password"
            value={ login.password }
            onChange={ handleInputChange }
            data-testid="password-input"
            type="password"
            placeholder="senha"
            required
          />
        </label>
        <label className="settingLoginContainer" htmlFor="button">
          <input
            className="settingLoginButton"
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
