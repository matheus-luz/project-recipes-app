import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <div>
      <header>
        <button type="button" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="profile-Icon" />
        </button>
        <h1 data-testid="page-title">{ title }</h1>
        <button type="button" data-testid="search-top-btn">
          <img src={ searchIcon } alt="share-icon" />
        </button>
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
