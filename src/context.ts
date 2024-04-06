import { createContext, useContext } from 'react';
import { ContextValue, Item } from 'interfaces';
import { useLocalStorage } from 'hooks';

export const appDataContext = createContext<ContextValue>({} as ContextValue);

export const useAppData = (): ContextValue => useContext<ContextValue>(appDataContext);

export function useProvideAppData(): ContextValue {
  const [items, setItems] = useLocalStorage<Item[]>('items', []);

  return {
    items,
    setItems,
  };
}
