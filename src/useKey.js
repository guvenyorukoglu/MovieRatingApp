import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", callback);

    // Cleanup event listener on unmount in order to avoid memory leaks and bugs in the future when the component is re-rendered multiple times
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
