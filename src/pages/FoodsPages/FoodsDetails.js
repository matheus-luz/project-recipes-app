import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchMealsRecipeByID } from '../../helpers/fetchApi';

function FoodsDetails() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);

  const { id } = useParams();

  const fetchRecipe = useCallback(
    async () => {
      const { meals } = await fetchMealsRecipeByID(id);
      setRecipe(meals[0]);
      console.log(meals[0]);
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
        .filter((item) => recipe[item] !== '')
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
        .filter((item) => recipe[item] !== ' ')
        .map((item) => recipe[item]);
      setMeasures(measuresFiltered);
    }, [recipe],
  );

  useEffect(() => {
    getMeasures();
  }, [getMeasures]);

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
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
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

      <video data-testid="video" controls>
        <source src={ strYoutube } type="video/mp4" />
        <track src="" kind="captions" srcLang="en" label="English" />
      </video>
      <p data-testid={ `${0}-recomendation-card` }>recomendation-card</p>

      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default FoodsDetails;
