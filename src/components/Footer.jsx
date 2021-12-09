import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </button>
      <button
        data-testid="explore-bottom-btn"
        type="button"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore-icon" />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal-icon" />
      </button>
    </footer>
  );
}

export default Footer;
