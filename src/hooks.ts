import { Dispatch, SetStateAction, useState, useEffect, ChangeEvent, useMemo } from 'react';
import { UseTableItemGeneric, UseTableItemTemplate } from './interfaces';

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
  }, [value, key]);

  return [value, setValue];
};

interface UseTableProps<T> {
  initialData: T[];
}

interface UseTableReturn<T extends UseTableItemTemplate> {
  toggle: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleAll: () => void;
  data: UseTableItemGeneric<T>[];
  hasAll: boolean;
  hasSome: boolean;
}

export const useTable = <T extends UseTableItemTemplate>({
  initialData,
}: UseTableProps<T>): UseTableReturn<T> => {
  const [data, setData] = useState(initialData);

  useEffect(() => { setData(initialData); }, [initialData]);

  const hasAny = Boolean(data.length);
  const hasAll = hasAny && data.every((x) => Boolean(x.selected));
  const hasSome = hasAny && data.some((x) => Boolean(x.selected));

  const toggleAll = () => {
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        selected: !hasAll,
      })),
    );
  };

  const toggle = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.currentTarget;

    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        selected: String(row.id) === id ? checked : row.selected,
      })),
    );
  };

  return {
    toggle,
    toggleAll,
    data,
    hasAll,
    hasSome,
  };
};

interface UseSearchProps<T> {
  items: T[];
}

export const useSearch = <T extends object>({ items }: UseSearchProps<T>) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    if (!searchValue) return items;

    const preparedValue = searchValue.toLowerCase();

    const result = items.filter((data) => {
      const values = Object.values(data).filter((v) => typeof v === 'string');

      const isIncluded = values.some((v) => v.toLowerCase().includes(preparedValue));
      return isIncluded;
    });

    return result;
  }, [searchValue, items]);

  return {
    data: filteredData,
    searchValue,
    setSearchValue,
  };
};