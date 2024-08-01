import { useState, useEffect } from "react";

const KEY = "8c8f1fa6";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();

    //abort controller to cancel fetch request if user types too fast or changes the query before the previous fetch request is completed
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);

        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (error) {
        // Do nothing if fetch was aborted
        if (controller.signal.aborted) return;

        if (error.Name !== "AbortError") {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    //cleanup
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
