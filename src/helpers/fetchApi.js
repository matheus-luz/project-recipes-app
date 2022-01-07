export const FOOD_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
export const FOOD_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const FOOD_FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const DRINK_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
export const DRINK_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const DRINK_FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const CATEGORY_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const CATEGORY_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const FILTER_BY_CATEGORY_FOOD = 'www.themealdb.com/api/json/v1/1/filter.php?c=';
export const FILTER_CATEGORY_DRINK = 'www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export function getIngredientLink(pathname) {
  return pathname.includes('comidas') ? FOOD_INGREDIENT : DRINK_INGREDIENT;
}

export function getNameLink(pathname) {
  return pathname.includes('comidas') ? FOOD_NAME_URL : DRINK_NAME_URL;
}

export function getFirstLetterLink(pathname) {
  return pathname.includes('comidas') ? FOOD_FIRST_LETTER_URL
    : DRINK_FIRST_LETTER_URL;
}

export async function fetchApi(endpoint) {
  const response = await fetch(endpoint);
  const result = await response.json();
  return Object.values(result)[0];
}

export async function fetchMealsRecipeByID(endpoint) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const response = await fetch(`${URL}${endpoint}`);
  const result = await response.json();
  return result;
}

export async function fetchDrinksRecipeByID(endpoint) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const response = await fetch(`${URL}${endpoint}`);
  const result = await response.json();
  return result;
}

export async function fetchRecomendation(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
