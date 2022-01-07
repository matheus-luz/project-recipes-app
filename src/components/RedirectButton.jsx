import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

function RedirectButton({ path, testId, title, func }) {
  const history = useHistory();

  function handleClick() {
    func();
    history.push(path);
  }

  return (
    <button
      onClick={ handleClick }
      type="button"
      data-testid={ testId }
    >
      { title }
    </button>
  );
}

RedirectButton.propTypes = {
  path: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  func: PropTypes.func,
};

RedirectButton.defaultProps = {
  func: () => {},
};

export default RedirectButton;
