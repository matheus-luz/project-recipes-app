import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import CardsListRecomendation from '../../components/CardListRecomendation';
import { DRINK_NAME_URL,
  fetchMealsRecipeByID, fetchRecomendation } from '../../helpers/fetchApi';
import '../../styles/details.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsDetails() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const fetchRecipe = useCallback(
    async () => {
      const { meals } = await fetchMealsRecipeByID(id);
      const { drinks } = await fetchRecomendation(DRINK_NAME_URL);
      setDrinksList(drinks);
      console.log(meals[0]);
      setRecipe(meals[0]);
      setIsLoading(false);
    }, [id],
  );

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const getIngredients = useCallback(
    () => {
      const ingredientsFiltered = Object.keys(recipe)
        .filter((item) => item.includes('strIngredient'))
        .filter((item) => (recipe[item] !== '' || null))
        .map((item) => recipe[item]);
      setIngredients(ingredientsFiltered);
    }, [recipe],
  );

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  const getMeasures = useCallback(
    () => {
      const measuresFiltered = Object.keys(recipe)
        .filter((item) => item.includes('strMeasure'))
        .filter((item) => (recipe[item] !== ' ' || null))
        .map((item) => recipe[item]);
      setMeasures(measuresFiltered);
    }, [recipe],
  );

  useEffect(() => {
    getMeasures();
  }, [getMeasures]);

  function handleShare() {
    setIsCopied(true);
    copy(window.location.href);
  }

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h3 data-testid="recipe-title">{ strMeal }</h3>

      <button
        onClick={ handleShare }
        data-testid="share-btn"
        type="button"
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      {isCopied && <span>Link copiado!</span>}

      <button
        onClick={ () => setIsFavorite(!isFavorite) }
        data-testid="favorite-btn"
        type="button"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Heart-icon" />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      <ol>
        {ingredients.map((item, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${item} - ${measure[index]}`}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{ strInstructions }</p>

      <iframe
        data-testid="video"
        width="560"
        height="315"
        title={ strMeal }
        frameBorder="0"
        src={ `https://www.youtube-nocookie.com/embed/${strYoutube.split('watch?v=')[1]}` }
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <CardsListRecomendation
        recomendations={ drinksList }
      />

      <button
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default FoodsDetails;
