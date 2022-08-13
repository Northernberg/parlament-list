import { useEffect, useState } from "react";

/**
 * Function to debounce a value change
 *
 * @param value state value to be changed (string)
 * @param timeoutDuration duration in milliseconds (number)
 * @returns debounced value after @timeoutDuration milliseconds
 */
export const useDebounce = (value: string, timeoutDuration = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [value, timeoutDuration]);
  return debouncedValue;
};
