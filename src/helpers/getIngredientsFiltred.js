export default function getIngredientsFiltered(recipe) {
  return Object.keys(recipe)
    .filter((item) => item.includes('strIngredient'))
    .filter((item) => (recipe[item] !== '' && recipe[item] !== null))
    .map((item) => recipe[item]);
}
