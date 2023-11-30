import { Dispatch, SetStateAction, useState, useEffect } from "react";

export const useLocalStorage = <S>(key: string, defaultValue: S):
[S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState<S>(() => {
    const storageValue = localStorage.getItem(key);

    return storageValue
      ? JSON.parse(storageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
