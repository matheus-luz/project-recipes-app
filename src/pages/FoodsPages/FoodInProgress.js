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
  const { id } = useParams();
  const history = useHistory();
  const fetchRecipe = useCallback(
    async () => {
      const { meals } = await fetchMealsRecipeByID(id);
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
    const isChecked = target.parentNode.classList;
    if (isChecked.contains('checked')) {
      isChecked.remove('checked');
    } else {
      isChecked.add('checked');
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
            data-testid={ `data-testid=${index}-ingredient-step` }
            key={ index }
          >
            <input type="checkbox" onChange={ check } />
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
