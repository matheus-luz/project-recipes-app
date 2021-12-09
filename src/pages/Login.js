import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { loginEmail } from '../redux/actions';

const SIX_NUMBER = 6;

function Login({ history, setEmailUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function validarEmail(emailValue) {
    const valid = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return valid.test(emailValue);
  }

  const passwordCheck = password.length > SIX_NUMBER;

  const isDisabled = passwordCheck && validarEmail(email);

  function handleSubmit() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setEmailUser(email);
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

Login.propTypes = {
  setEmailUser: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setEmailUser: (email) => dispatch(loginEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
