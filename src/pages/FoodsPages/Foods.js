import React, { useContext, useEffect } from 'react';
import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import MyContext from '../../context/MyContext';
import { FOOD_NAME_URL } from '../../helpers/fetchApi';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function Foods() {
  const FOODS_SIZE = 12;
  const [data] = useRequesteAPI(FOOD_NAME_URL, FOODS_SIZE);
  const { setRequestAPI } = useContext(MyContext);

  useEffect(() => {
    setRequestAPI(data);
  }, [setRequestAPI, data]);

  return (
    <div>
      <Header title="Comidas" isSearchEnabled />
      <CardsList />
      <Footer />
    </div>
  );
}

export default Foods;
