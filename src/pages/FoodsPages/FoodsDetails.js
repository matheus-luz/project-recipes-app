import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import CardsListRecomendation from '../../components/CardListRecomendation';
import { DRINK_NAME_URL,
  fetchMealsRecipeByID, fetchRecomendation } from '../../helpers/fetchApi';
import '../../styles/details.css';

function FoodsDetails() {
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasures] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  const fetchRecipe = useCallback(
    async () => {
      const { meals } = await fetchMealsRecipeByID(id);
      const { drinks } = await fetchRecomendation(DRINK_NAME_URL);
      setDrinksList(drinks);
      console.log(drinks);
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
