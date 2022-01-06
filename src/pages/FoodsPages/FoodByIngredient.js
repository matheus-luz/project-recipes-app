import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MyContext from '../../context/MyContext';
import { INGREDIENT_FOOD, FOOD_INGREDIENT } from '../../helpers/fetchApi';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function FoodByIngredient() {
  const { setRequestAPI, setRequestIngredient } = useContext(MyContext);
  const INGREDIENT_SIZE = 12;
  const IMG_LINK = 'https://www.themealdb.com/images/ingredients/';
  const [ingredient] = useRequesteAPI(INGREDIENT_FOOD, INGREDIENT_SIZE);

  const getDataAPI = async (LINK) => {
    try {
      const request = await fetch(LINK);
      const response = await request.json();
      return Object.values(response)[0].slice(0, INGREDIENT_SIZE);
    } catch (err) {
      console.log(`Error Reading data ${err}`);
    }
  };

  const handleIndgredientClick = async ({ target }) => {
    setRequestIngredient(true);
    const ingredientName = (target.parentNode.lastChild.textContent);
    const link = FOOD_INGREDIENT + ingredientName;
    const DATA_API = await getDataAPI(link);
    console.log(target.parentNode.parentNode);
    setRequestAPI(DATA_API);
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <section>
        {ingredient.map((meals, index) => (
          <Link
            name={ meals.strIngredient }
            key={ `${index}-${meals.strIngredient}` }
            onClick={ handleIndgredientClick }
            to={ { pathname: '/comidas' } }
          >
            <div data-testid={ `${index}-ingredient-card` }>

              <h2 data-testid={ `${index}-card-name` }>{meals.strIngredient}</h2>
              <img
                data-testid={ `${index}-card-img` }
                src={ `${IMG_LINK}${meals.strIngredient}-Small.png` }
                alt={ meals.strIngredient }
              />
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodByIngredient;
