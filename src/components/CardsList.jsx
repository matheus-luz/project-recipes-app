import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function CardsList() {
  // const { requestAPI } = useContext(MyContext);
  const { isLoading, requestAPI } = useContext(MyContext);
  function cardItem() {
    if (requestAPI.length > 1) {
      return (
        requestAPI.map((recipe, index) => {
          const all = recipe.strMealThumb || recipe.strDrinkThumb;
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img data-testid={ `${index}-card-img` } src={ all } alt="" />
              <h3 data-testid={ `${index}-card-name` }>{recipe.idDrink}</h3>
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
