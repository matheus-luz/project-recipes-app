import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchApi,
  INGREDIENT_URL,
  NAME_URL,
  FIRST_LETTER_URL,
  getLink,
} from '../helpers/fetchApi';

function Search() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('');
  const { location: { pathname } } = useHistory();

  function handleSearch() {
    if (filter === FIRST_LETTER_URL && input.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      fetchApi(`${filter}${input}`);
    }
  }
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setInput(value) }
        value={ input }
      />
      <label htmlFor="ingredient-search">
        Ingrediente
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="filter-type"
          id="ingredient-search"
          onChange={ () => setFilter(getLink('ingredient', pathname)) }
        />
      </label>
      <label htmlFor="name-search">
        Nome
        <input
          data-testid="name-search-radio"
          type="radio"
          name="filter-type"
          id="name-search"
          onChange={ () => setFilter(getLink('name', pathname)) }
        />
      </label>
      <label htmlFor="first-letter-search">
        Primeira letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="filter-type"
          id="first-letter-search"
          onChange={ () => setFilter(getLink('first-letter', pathname)) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
