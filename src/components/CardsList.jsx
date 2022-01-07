import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

const MAGIC_NUMBER = 11;

function CardsList() {
  const { isLoading, requestAPI } = useContext(MyContext);

  const verificationValue = (recipe) => (recipe ? '/comidas/' : '/bebidas/');

  function cardItem() {
    if (requestAPI === null) return;
    if (requestAPI) {
      return (
        requestAPI.map((recipe, index) => {
          const value = verificationValue(recipe.idMeal);
          if (index > MAGIC_NUMBER) return null;
          return (
            <Link
              key={ `${index}-${recipe.idMeal}` }
              to={ `${value}${recipe.idMeal || recipe.idDrink}` }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  style={ { width: '100px' } }
                  src={ recipe.strMealThumb || recipe.strDrinkThumb }
                  alt={ recipe.strDrink || recipe.strMeal }
                />
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {recipe.strDrink || recipe.strMeal}
                </h3>
              </div>
            </Link>
          );
        })
      );
    }
  }

  return (
    <div>
      { isLoading
        ? <span>Loading...</span>
        : cardItem() }
    </div>
  );
}

export default CardsList;
