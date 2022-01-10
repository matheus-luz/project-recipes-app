import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

const SIX_NUMBER = 6;

function Login() {
  const [password, setPassword] = useState('');

  const { email, setEmail } = useContext(MyContext);
  const history = useHistory();

  function validarEmail(emailValue) {
    const valid = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return valid.test(emailValue);
  }

  const passwordCheck = password.length > SIX_NUMBER;

  const isDisabled = passwordCheck && validarEmail(email);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setEmail(email);
    history.push('/comidas');
  }

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          <input
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
            type="email"
            id="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          <input
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
            type="password"
            id="password"
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ !isDisabled }
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Login;
