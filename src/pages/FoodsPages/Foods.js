import React, { useContext, useEffect, useState } from 'react';

import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import MyContext from '../../context/MyContext';
import { FOOD_NAME_URL,
  FILTER_BY_CATEGORY_FOOD,
  CATEGORY_FOOD } from '../../helpers/fetchApi';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function Foods() {
  const FOODS_SIZE = 12;
  const CATEGORY_SIZE = 5;

  const [currentButton, setCurrentButton] = useState('');

  const { setRequestAPI, setRequestIngredient,
    requestIngredient } = useContext(MyContext);

  const [data] = useRequesteAPI(FOOD_NAME_URL, FOODS_SIZE);
  const [categoryFood] = useRequesteAPI(CATEGORY_FOOD, CATEGORY_SIZE);

  const nameCategory = categoryFood.map((category) => Object.values(category)[0]);

  const getDataAPI = async (LINK) => {
    try {
      const request = await fetch(`https://${LINK}`);
      const response = await request.json();
      return Object.values(response)[0].slice(0, FOODS_SIZE);
    } catch (err) {
      console.log(`Error Reading data ${err}`);
    }
  };

  const handleChangeCategories = async ({ target }) => {
    const text = target.textContent;
    if (currentButton !== text) {
      const DATA_API = await getDataAPI(`${FILTER_BY_CATEGORY_FOOD}${text}`);
      setRequestAPI(DATA_API);
      setCurrentButton(text);
    } else {
      setRequestAPI(data);
      setCurrentButton('');
    }
  };

  const handleAllCategory = () => setRequestAPI(data);

  useEffect(() => {
    if (!requestIngredient) {
      setRequestIngredient(false);
      setRequestAPI(data);
    }
  }, [setRequestAPI, data, setRequestIngredient, requestIngredient]);

  return (
    <div>
      <Header title="Comidas" isSearchEnabled />
      <section>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleAllCategory }
        >
          All
        </button>
        {nameCategory.map((category, index) => (
          <div key={ `${index}-${category}` }>
            <button
              data-testid={ `${category}-category-filter` }
              type="button"
              onClick={ (event) => handleChangeCategories(event) }
            >
              {category}

            </button>
          </div>
        ))}
      </section>
      <CardsList />
      <Footer />
    </div>
  );
}

export default Foods;
