import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './MyContext';

function MyContextProvider({ children }) {
  const [email, setEmail] = useState('');
  const [requestAPI, setRequestAPI] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    email,
    setEmail,
    requestAPI,
    setRequestAPI,
    isLoading,
    setIsLoading,
    typeOfSearch,
    setTypeOfSearch,
    setIsFilterOn,
    isFilterOn,
  };

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
