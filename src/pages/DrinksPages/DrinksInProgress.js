import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import getIngredientsFiltered from '../../helpers/getIngredientsFiltred';
import { fetchDrinksRecipeByID } from '../../helpers/fetchApi';
import '../../styles/RecipesInProgress.css';

const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

function startRecipe(id, setIngredientsCheck) {
  if (!inProgress) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { [id]: [] },
      meals: {},
    }));
    console.log('v');
  } else if (inProgress.cocktails[id]) {
    setIngredientsCheck(inProgress.cocktails[id]);
    console.log('a');
  } else {
    console.log('b');
    inProgress.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
}

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
  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  useEffect(() => {
    startRecipe(id, setIngredientsCheck);
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
    const value = target.parentNode.innerText;
    const isChecked = target.parentNode.classList;
    console.log(isChecked);
    if (isChecked.contains('checked')) {
      const filterIngredient = inProgressIngredient.cocktails[id].filter((item) => (
        item !== value
      ));
      inProgressIngredient.cocktails[id] = filterIngredient;
      setIngredientsCheck(filterIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressIngredient));
      console.log('Nocheck');
    } else {
      setIngredientsCheck([...ingredientsCheck, value]);
      inProgressIngredient.cocktails[id].push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressIngredient));
      console.log(value);
      console.log(inProgressIngredient);
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
            className={
              ingredientsCheck.includes(`${item} - ${measure[index]}`) ? 'checked' : null
            }
            data-testid={ `data-testid=${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              onChange={ check }
              checked={
                ingredientsCheck.includes(`${item} - ${measure[index]}`)
              }
            />
            { console.log(ingredientsCheck) }
            { console.log(ingredientsCheck.includes(`${item} - ${measure[index]}`)) }
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
