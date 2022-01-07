import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function FoodExplore() {
  const randowDrink = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const ARRAY_SIZE = 1;
  const history = useHistory();
  const [data] = useRequesteAPI(randowDrink, ARRAY_SIZE);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes

      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/area') }
        data-testid="explore-by-area"
      >
        Por Local de Origem

      </button>
      <button
        type="button"
        onClick={ () => history.push(`/comidas/${data[0].idMeal}`) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default FoodExplore;
