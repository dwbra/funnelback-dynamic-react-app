/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

/**
 * Custom hook that delays updating a value by a specified delay (in milliseconds).
 * This hook can be used to throttle or debounce input values to prevent rapid state updates.
 * @example
 * const debouncedSearchQuery = useDebounce(searchQuery, 500);
 */
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout on value change or component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
