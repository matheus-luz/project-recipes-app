import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MyContext from '../../context/MyContext';
import { INGREDIENT_DRINK, DRINK_INGREDIENT } from '../../helpers/fetchApi';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function DrinkByIngredient() {
  const { setRequestAPI, setRequestIngredient } = useContext(MyContext);
  const INGREDIENT_SIZE = 12;
  const IMG_LINK = 'https://www.thecocktaildb.com/images/ingredients/';
  const [ingredient] = useRequesteAPI(INGREDIENT_DRINK, INGREDIENT_SIZE);

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
    const link = DRINK_INGREDIENT + ingredientName;
    const DATA_API = await getDataAPI(link);
    setRequestAPI(DATA_API);
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <section>
        {ingredient.map((drink, index) => (
          <Link
            name={ drink.strIngredient1 }
            key={ `${index}-${drink.strIngredient1}` }
            onClick={ handleIndgredientClick }
            to={ { pathname: '/bebidas' } }
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `${IMG_LINK}${drink.strIngredient1}-Small.png` }
                alt={ drink.strIngredient1 }
              />
              <h2 data-testid={ `${index}-card-name` }>{drink.strIngredient1}</h2>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinkByIngredient;
