import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, isSearchEnabled = false }) {
  return (
    <div>
      <header>
        <button src={ profileIcon } type="button" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="profile-Icon" />
        </button>
        <h1 data-testid="page-title">{ title }</h1>
        { isSearchEnabled && (
          <button src={ searchIcon } type="button" data-testid="search-top-btn">
            <img src={ searchIcon } alt="share-icon" />
          </button>)}
      </header>
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
