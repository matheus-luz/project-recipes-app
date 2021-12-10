import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import {
  fetchApi,
  getIngredientLink,
  getNameLink,
  getFirstLetterLink,
  FOOD_FIRST_LETTER_URL,
  DRINK_FIRST_LETTER_URL,
} from '../helpers/fetchApi';

function Search({ title }) {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('');
  const { location: { pathname } } = useHistory();
  const {
    requestAPI, setRequestAPI, setIsLoading, setTypeOfSearch } = useContext(MyContext);

  const history = useHistory();

  async function handleSearch() {
    if ((filter === FOOD_FIRST_LETTER_URL || filter === DRINK_FIRST_LETTER_URL)
      && input.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      setIsLoading(true);
      const response = await fetchApi(`${filter}${input}`);
      await setRequestAPI(response);
    }
    setIsLoading(false);
    setTypeOfSearch(title.toLowerCase());
  }

  useEffect(() => {
    if (requestAPI.length === 1) {
      const id = Object.values(requestAPI[0])[0];
      history.push(`/${title.toLowerCase()}/${id}`);
    }
  }, [requestAPI, history, title]);

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
          onChange={ () => setFilter(getIngredientLink(pathname)) }
        />
      </label>
      <label htmlFor="name-search">
        Nome
        <input
          data-testid="name-search-radio"
          type="radio"
          name="filter-type"
          id="name-search"
          onChange={ () => setFilter(getNameLink(pathname)) }
        />
      </label>
      <label htmlFor="first-letter-search">
        Primeira letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="filter-type"
          id="first-letter-search"
          onChange={ () => setFilter(getFirstLetterLink(pathname)) }
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

Search.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Search;
