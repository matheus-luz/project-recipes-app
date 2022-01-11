import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import getIngredientsFiltered from '../../helpers/getIngredientsFiltred';
import { fetchMealsRecipeByID } from '../../helpers/fetchApi';

function FoodInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const [ingredientsCheck, setIngredientsCheck] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const fetchRecipe = useCallback(
    async () => {
      const { meals } = await fetchMealsRecipeByID(id);
      setRecipe(meals[0]);
      setIsLoading(false);
    }, [id],
  );

  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  function startRecipe() {
    if (!inProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [id]: [] },
        cocktails: {},
      }));
    } else if (inProgress.meals[id]) {
      setIngredientsCheck(inProgress.meals[id]);
    } else {
      inProgress.meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  }
  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  useEffect(() => {
    startRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getIngredients = useCallback(
    () => {
      setIngredients(getIngredientsFiltered(recipe));
    }, [recipe],
  );
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
    getIngredients();
    getMeasures();
  }, [getIngredients, getMeasures]);

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  function check({ target }) {
    const inProgressIngredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const valueIn = target.value;
    if (ingredientsCheck.includes(valueIn)) {
      const filterIngredient = ingredientsCheck.filter((item) => item !== valueIn);
      inProgressIngredient.meals[id] = filterIngredient;
      setIngredientsCheck(filterIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressIngredient));
    } else {
      setIngredientsCheck([...ingredientsCheck, valueIn]);
      inProgressIngredient.meals[id].push(valueIn);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressIngredient));
    }
  }

  return (
    <div>
      <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
      <img data-testid="recipe-photo" alt="comida" src={ recipe.strMealThumb } />
      <p data-testid="recipe-category">{recipe.strCategory}</p>
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
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              value={ `${item} - ${measure[index]}` }
              checked={ ingredientsCheck.includes(`${item} - ${measure[index]}`) }
              onChange={ check }
            />
            {`${item} - ${measure[index]}`}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        className="finish-recipe"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default FoodInProgress;
