import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import getIngredientsFiltered from '../../helpers/getIngredientsFiltred';
import { fetchDrinksRecipeByID } from '../../helpers/fetchApi';

function DrinksInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const { id } = useParams();
  const fetchRecipe = useCallback(
    async () => {
      const { drinks } = await fetchDrinksRecipeByID(id);
      setRecipe(drinks[0]);
      setIsLoading(false);
    }, [id],
  );
  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  function getMeasuresFiltered(recipe) {
    return Object.keys(recipe)
      .filter((item) => item.includes('strMeasure'))
      .filter((item) => recipe[item] !== null)
      .map((item) => recipe[item]);
  }

  const getIngredients = useCallback(
    () => {
      setIngredients(getIngredientsFiltered(recipe));
    }, [recipe],
  );
  const getMeasures = useCallback(
    () => {
      console.log(recipe);
      const measuresFiltered = Object.keys(recipe)
        .filter((item) => item.includes('strMeasure'))
        .filter((item) => (recipe[item] !== ' ' && recipe[item] !== null))
        .map((item) => recipe[item]);
      setMeasures(measuresFiltered);
    }, [recipe],
  );

  useEffect(() => {
    setMeasures(getMeasuresFiltered(recipe));
    fetchRecipe();
  }, [recipe, fetchRecipe]);

  useEffect(() => {
    getIngredients();
    getMeasures();
  }, [getIngredients, getMeasures]);

  return (
    <div>
      <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
      <img data-testid="recipe-photo" alt="comida" src={ recipe.strDrinkThumb } />
      <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img alt="Heart-icon" />
      </button>
      <button
        data-testid="share-btn"
        type="button"
      >
        <img alt="share-icon" />
      </button>
      <ol>
        {ingredients.map((item, index) => (
          <li
            data-testid={ `data-testid=${index}-ingredient-step` }
            key={ index }
          >
            {`${item} - ${measure[index]}`}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        className="finish-recipe"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinksInProgress;
