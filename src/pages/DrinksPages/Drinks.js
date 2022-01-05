import React, { useContext, useEffect, useState } from 'react';
import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MyContext from '../../context/MyContext';
import { CATEGORY_DRINK,
  DRINK_NAME_URL, FILTER_CATEGORY_DRINK } from '../../helpers/fetchApi';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function Drinks() {
  const FOODS_SIZE = 12;
  const CATEGORY_SIZE = 5;

  const [data] = useRequesteAPI(DRINK_NAME_URL, FOODS_SIZE);

  const [currentButton, setCurrentButton] = useState('');

  const { setRequestAPI } = useContext(MyContext);
  const [categoryFood] = useRequesteAPI(CATEGORY_DRINK, CATEGORY_SIZE);

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
      const DATA_API = await getDataAPI(`${FILTER_CATEGORY_DRINK}${text}`);
      setRequestAPI(DATA_API);
      setCurrentButton(text);
    } else {
      setRequestAPI(data);
      setCurrentButton('');
    }
  };

  const handleAllCategory = () => setRequestAPI(data);

  useEffect(() => {
    setRequestAPI(data);
  }, [setRequestAPI, data]);

  return (
    <div>
      <Header title="Bebidas" isSearchEnabled />
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
              onClick={ handleChangeCategories }
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

export default Drinks;
