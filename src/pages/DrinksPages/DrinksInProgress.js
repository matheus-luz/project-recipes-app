import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import getIngredientsFiltered from '../../helpers/getIngredientsFiltred';
import { fetchDrinksRecipeByID } from '../../helpers/fetchApi';
import '../../styles/RecipesInProgress.css';

function DrinksInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [ingredientsCheck, setIngredientsCheck] = useState([]);
  const fetchRecipe = useCallback(
    async () => {
      const { drinks } = await fetchDrinksRecipeByID(id);
      setRecipe(drinks[0]);
      setIsLoading(false);
    }, [id],
  );

  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  function startRecipe() {
    if (!inProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] },
        meals: {},
      }));
    } else if (inProgress.cocktails[id]) {
      setIngredientsCheck(inProgress.cocktails[id]);
    } else {
      inProgress.cocktails[id] = [];
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

  function getMeasuresFiltered(ingredient) {
    return Object.keys(ingredient)
      .filter((item) => item.includes('strMeasure'))
      .filter((item) => ingredient[item] !== null)
      .map((item) => ingredient[item]);
  }

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
    setMeasures(getMeasuresFiltered(recipe));
  }, [recipe]);

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
      const filterIngredient = inProgressIngredient.cocktails[id].filter((item) => (
        item !== valueIn
      ));
      inProgressIngredient.cocktails[id] = filterIngredient;
      setIngredientsCheck(filterIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressIngredient));
    } else {
      setIngredientsCheck([...ingredientsCheck, valueIn]);
      inProgressIngredient.cocktails[id].push(valueIn);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressIngredient));
    }
  }

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
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              value={ `${item} - ${measure[index]}` }
              onChange={ check }
              checked={ ingredientsCheck.includes(`${item} - ${measure[index]}`) }
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

export default DrinksInProgress;
