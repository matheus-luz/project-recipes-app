export default function saveDrink(isFavorite, recipe, id) {
  const checkFavorite = !isFavorite;

  const favoriteRecipe = {
    id,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
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
