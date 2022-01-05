import { useEffect, useState } from 'react';

function useRequesteAPI(API) {
  const SEARCH_LIST = API;
  const ARRAY_SIZE = 12;
  const [data, setData] = useState([]);

  const getDataAPI = () => {
    fetch(SEARCH_LIST)
      .then((response) => response.json())
      .then((dataAPI) => setData(dataAPI.meals.slice(0, ARRAY_SIZE)));
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  return [data];
}

export default useRequesteAPI;
