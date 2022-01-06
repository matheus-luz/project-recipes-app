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
          const all = recipe.strMealThumb || recipe.strDrinkThumb;
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img data-testid={ `${index}-card-img` } src={ all } alt="" />
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
