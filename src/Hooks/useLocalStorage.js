import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export { useLocalStorage };
