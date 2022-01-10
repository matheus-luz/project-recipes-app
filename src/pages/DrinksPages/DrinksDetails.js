import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CardsListRecomendation from '../../components/CardListRecomendation';
import { fetchDrinksRecipeByID,
  fetchRecomendation, FOOD_NAME_URL } from '../../helpers/fetchApi';
import '../../styles/details.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import saveDrink from '../../helpers/saveDrinkLocalStorage';
import getIngredientsFiltered from '../../helpers/getIngredientsFiltred';
import RedirectButton from '../../components/RedirectButton';

const copy = require('clipboard-copy');

function getInfo(info) {
  const recipes = JSON.parse(localStorage.getItem(info) || '[]');
  return recipes;
}

function getMeasuresFiltered(recipe) {
  return Object.keys(recipe)
    .filter((item) => item.includes('strMeasure'))
    .filter((item) => recipe[item] !== null)
    .map((item) => recipe[item]);
}

function startRecipe(id) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgress) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { [id]: [] },
      meals: {},
    }));
  } else {
    inProgress.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
}

function DrinksDetails() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const [foodsList, setFoodsList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  const { id } = useParams();

  const fetchRecipe = useCallback(
    async () => {
      const { drinks } = await fetchDrinksRecipeByID(id);
      const { meals } = await fetchRecomendation(FOOD_NAME_URL);
      setFoodsList(meals);
      setRecipe(drinks[0]);
      setIsLoading(false);
    }, [id],
  );

  const getIngredients = useCallback(
    () => {
      setIngredients(getIngredientsFiltered(recipe));
    }, [recipe],
  );

  useEffect(() => {
    setMeasures(getMeasuresFiltered(recipe));
    getIngredients();
  }, [recipe, getIngredients]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  useEffect(() => {
    const recipes = getInfo('favoriteRecipes');
    const checkRecipe = recipes.some((item) => item.id === id);
    if (checkRecipe) {
      setIsFavorite(true);
    }
  }, [id]);

  useEffect(() => {
    const { cocktails } = getInfo('inProgressRecipes');
    if (cocktails) {
      const ids = Object.keys(cocktails);
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
    saveDrink(isFavorite, recipe, id);
  }

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h3 data-testid="recipe-title">{ strDrink }</h3>

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

      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <ol>
        {ingredients.map((item, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${item} ${!measure[index] ? '' : `- ${measure[index]}`}`}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{ strInstructions }</p>

      <CardsListRecomendation
        recomendations={ foodsList }
      />

      {
        isInProgress
          ? (
            <RedirectButton
              title="Continuar Receita"
              testId="start-recipe-btn"
              className="start-recipe"
              path={ `/bebidas/${id}/in-progress` }
            />)
          : (
            <RedirectButton
              title="Iniciar Receita"
              testId="start-recipe-btn"
              className="start-recipe"
              path={ `/bebidas/${id}/in-progress` }
              func={ () => startRecipe(id) }
            />)
      }
    </div>
  );
}

export default DrinksDetails;
