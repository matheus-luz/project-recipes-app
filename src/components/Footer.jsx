import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const { setIsFilterOn } = useContext(MyContext);
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        src={ drinkIcon }
        onClick={ () => {
          setIsFilterOn(false);
          history.push('/bebidas');
        } }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </button>
      <button
        data-testid="explore-bottom-btn"
        type="button"
        src={ exploreIcon }
        onClick={ () => history.push('/explorar') }
      >
        <img src={ exploreIcon } alt="explore-icon" />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        src={ mealIcon }
        onClick={ () => {
          setIsFilterOn(false);
          history.push('/comidas');
        } }
      >
        <img src={ mealIcon } alt="meal-icon" />
      </button>
    </footer>
  );
}

export default Footer;
