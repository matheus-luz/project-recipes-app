export const INGREDIENT_URL = `https://www.${}.com/api/json/v1/1/filter.php?i=`;
export const NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export function getLink(type, pathname) {
  switch (type) {
  case 'ingredient':
    return INGREDIENT_URL
  }
}
export async function fetchApi(endpoint) {
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}
