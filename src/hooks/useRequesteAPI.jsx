import { useEffect, useState } from 'react';

function useRequesteAPI(API, ARRAY_SIZE) {
  const SEARCH_LIST = API;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(SEARCH_LIST)
      .then((response) => response.json())
      .then((dataAPI) => setData(Object.values(dataAPI)[0].slice(0, ARRAY_SIZE)));
  }, [SEARCH_LIST, ARRAY_SIZE]);

  return [data];
}

export default useRequesteAPI;
