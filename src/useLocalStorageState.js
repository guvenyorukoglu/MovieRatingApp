import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  //Named as useLocalStorageState since it is a custom hook to manage the state of the watched movies in local storage, and will work similarly to useState
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
