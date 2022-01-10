import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CardsListRecomendation from '../../components/CardListRecomendation';
import { DRINK_NAME_URL,
  fetchMealsRecipeByID, fetchRecomendation } from '../../helpers/fetchApi';
import '../../styles/details.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import saveMeal from '../../helpers/saveMealLocalStorage';
import getIngredientsFiltered from '../../helpers/getIngredientsFiltred';
import RedirectButton from '../../components/RedirectButton';

const copy = require('clipboard-copy');

function FoodsDetails() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  const { id } = useParams();

  const fetchRecipe = useCallback(
    async () => {
      const { meals } = await fetchMealsRecipeByID(id);
      const { drinks } = await fetchRecomendation(DRINK_NAME_URL);
      setDrinksList(drinks);
      setRecipe(meals[0]);

      setIsLoading(false);
    }, [id],
  );

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);
  const getIngredients = useCallback(
    () => {
      setIngredients(getIngredientsFiltered(recipe));
    }, [recipe],
  );

  const getMeasures = useCallback(
    () => {
      const measuresFiltered = Object.keys(recipe)
        .filter((item) => item.includes('strMeasure'))
        .filter((item) => (recipe[item] !== ' ' && recipe[item] !== null))
        .map((item) => recipe[item]);
      setMeasures(measuresFiltered);
    }, [recipe],
  );

  useEffect(() => {
    getIngredients();
    getMeasures();
  }, [getIngredients, getMeasures]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const checkRecipe = recipes.some((item) => item.id === id);
    if (checkRecipe) {
      setIsFavorite(true);
    }
  }, [id]);

  useEffect(() => {
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
    if (meals) {
      const ids = Object.keys(meals);
      const checkRecipe = ids.some((item) => item === id);
      if (checkRecipe) {
        setIsInProgress(true);
      }
    }
  }, [id]);

  function handleShare() {
    setIsCopied(true);
    copy(window.location.href);
  }

  function handleFavorite() {
    setIsFavorite(!isFavorite);
    saveMeal(recipe, isFavorite, id);
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
        onClick={ handleFavorite }
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

      {
        isInProgress
          ? (
            <RedirectButton
              title="Continuar Receita"
              testId="start-recipe-btn"
              className="start-recipe"
              path={ `/comidas/${id}/in-progress` }
            />)
          : (
            <RedirectButton
              title="Iniciar Receita"
              testId="start-recipe-btn"
              className="start-recipe"
              path={ `/comidas/${id}/in-progress` }
            />)
      }
    </div>
  );
}

export default FoodsDetails;
