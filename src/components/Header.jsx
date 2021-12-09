import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, isSearchEnabled = false }) {
  const history = useHistory();
  const [isInput, setIsInput] = useState(false);

  return (
    <div>
      <header>
        <button
          src={ profileIcon }
          type="button"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
        >
          <img src={ profileIcon } alt="profile-Icon" />
        </button>
        <h1 data-testid="page-title">{ title }</h1>
        { isSearchEnabled && (
          <button
            src={ searchIcon }
            type="button"
            data-testid="search-top-btn"
            onClick={ () => setIsInput(!isInput) }
          >
            <img src={ searchIcon } alt="share-icon" />
          </button>)}
      </header>
      {isInput
      && <input data-testid="search-input" type="text" />}
    </div>
  );
}

Header.propTypes = {
  isSearchEnabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  isSearchEnabled: false,
};

export default Header;
