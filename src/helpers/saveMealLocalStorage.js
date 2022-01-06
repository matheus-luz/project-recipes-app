export default function saveMeal(recipe, isFavorite, id) {
  const checkFavorite = !isFavorite;

  const favoriteRecipe = {
    id,
    type: 'comida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };

  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  if (checkFavorite) {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([...recipes, favoriteRecipe]));
  } else {
    const removedRecipe = recipes.filter((item) => item.id !== id);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify(removedRecipe));
  }
}
