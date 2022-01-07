import React from 'react';

const MAGIC_NUMBER = 5;

function CardsListRecomendation(props) {
  const { recomendations } = props;
  return (
    recomendations.map((recipe, index) => {
      if (index > MAGIC_NUMBER) return;
      const all = recipe.strMealThumb || recipe.strDrinkThumb;
      return (
        <div key={ index } data-testid={ `${index}-recomendation-card` }>
          <img data-testid={ `${index}-card-img` } src={ all } alt="" />
          <h3
            data-testid={ `${index}-recomendation-title` }
          >
            {recipe.strDrink || recipe.strMeal}
          </h3>
        </div>
      );
    })
  );
}

export default CardsListRecomendation;
