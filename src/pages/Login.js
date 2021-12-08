import React, { useState, useEffect } from 'react';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  console.log(login.email, login.password);

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

  return (
    <div>
      <form>
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
            type="button"
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
