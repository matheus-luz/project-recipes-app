import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './MyContext';

function MyContextProvider({ children }) {
  const [requestAPI, setRequestAPI] = useState([]);
  const [typeOfSearch, setTypeOfSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    requestAPI,
    setRequestAPI,
    isLoading,
    setIsLoading,
    typeOfSearch,
    setTypeOfSearch };
  return (
    <MyContext.Provider value={ data }>
      { children }
    </MyContext.Provider>
  );
}

MyContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyContextProvider;