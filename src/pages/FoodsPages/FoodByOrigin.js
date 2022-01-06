import React, { useContext, useEffect } from 'react';

import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MyContext from '../../context/MyContext';
import { FOODS_AREA, FOODS_BY_AREA } from '../../helpers/fetchApi';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function FoodByOrigin() {
  const { setRequestAPI } = useContext(MyContext);
  const ALL_AREA = 99;

  const [area] = useRequesteAPI(FOODS_AREA, ALL_AREA);
  console.log(area);

  const getDataAPI = async (LINK) => {
    try {
      const request = await fetch(LINK);
      const response = await request.json();
      return Object.values(response)[0].slice(0, ALL_AREA);
    } catch (err) {
      console.log(`Error Reading data ${err}`);
    }
  };

  const handleAreaDropdownChange = async ({ target }) => {
    const countrySelected = (target.value);
    const link = FOODS_BY_AREA + countrySelected;
    const DATA_API = await getDataAPI(link);
    setRequestAPI(DATA_API);
  };

  useEffect(() => {
    const requestAPI = async () => {
      const dataAPI = await getDataAPI('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
      setRequestAPI(dataAPI);
    };
    requestAPI();
  }, [setRequestAPI]);

  return (
    <div>
      <Header title="Explorar Origem" isSearchEnabled />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleAreaDropdownChange }
        defaultValue="American"
      >
        {area.map((country, index) => (
          <option
            data-testid={ `${country.strArea}-option` }
            key={ `${index}-${country.strArea}` }
            value={ country.strArea }
          >
            {country.strArea}

          </option>
        ))}
      </select>
      <CardsList />
      <Footer />
    </div>
  );
}

export default FoodByOrigin;
