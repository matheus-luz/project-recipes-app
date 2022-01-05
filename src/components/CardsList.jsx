import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const MAGIC_NUMBER = 11;

function CardsList() {
  const { isLoading, requestAPI } = useContext(MyContext);
  function cardItem() {
    if (requestAPI === null) return;
    if (requestAPI.length > 1) {
      return (
        requestAPI.map((recipe, index) => {
          if (index > MAGIC_NUMBER) return;
          return (
            <div
              key={ `${index}-${recipe.idMeal}` }
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
