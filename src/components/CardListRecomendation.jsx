import PropTypes from 'prop-types';
import React from 'react';
import '../styles/carousel.css';

const MAGIC_NUMBER = 5;

function CardsListRecomendation(props) {
  const { recomendations } = props;
  return (
    <section className="container">
      { recomendations.map((recipe, index) => {
        if (index > MAGIC_NUMBER) return;
        const all = recipe.strMealThumb || recipe.strDrinkThumb;
        return (
          <div
            className="carousel-container"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="carousel-picture"
              data-testid={ `${index}-card-img` }
              src={ all }
              alt=""
            />
            <h3
              className="carousel-title"
              data-testid={ `${index}-recomendation-title` }
            >
              {recipe.strDrink || recipe.strMeal}
            </h3>
          </div>
        );
      })}
    </section>
  );
}

CardsListRecomendation.propTypes = {
  recomendations: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default CardsListRecomendation;
