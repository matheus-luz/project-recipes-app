import React from 'react';

function Search() {
  return (
    <div>
      <input data-testid="search-input" type="text" />
      <input data-testid="ingredient-search-radio" type="radio" name="filter-type" />
      <input data-testid="name-search-radio" type="radio" name="filter-type" />
      <input data-testid="first-letter-search-radio" type="radio" name="filter-type" />
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default Search;
