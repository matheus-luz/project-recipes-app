import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useRequesteAPI from '../../hooks/useRequesteAPI';

function DrinkExplore() {
  const randowDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const ARRAY_SIZE = 1;
  const history = useHistory();
  const [data] = useRequesteAPI(randowDrink, ARRAY_SIZE);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes

      </button>
      <button
        type="button"
        onClick={ () => history.push(`/bebidas/${data[0].idDrink}`) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default DrinkExplore;
