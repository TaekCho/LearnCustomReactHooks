// Important to name it starting with "use" as a convention
// Functions starting with 'use' are treated as hooks

import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }

      setIsFetching(false);
    }

    fetchData();
    // Below is external data undefined inside useEffect, thus added.
  }, [fetchFn]);

  return {
    isFetching,
    error,
    setFetchedData,
    fetchedData,
  };
}
