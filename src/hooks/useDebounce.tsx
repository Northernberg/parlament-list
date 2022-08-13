import { useEffect, useState } from 'react';

export const useDebounce = (value: string, timeoutDuration = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [value, timeoutDuration]);
  return debouncedValue;
};
