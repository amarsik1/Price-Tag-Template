import { createContext, useContext } from 'react';
import { ContextValue, CurrencySymbol, Item } from 'interfaces';
import { useLocalStorage } from 'hooks';

export const appDataContext = createContext<ContextValue>({} as ContextValue);

export const useAppData = (): ContextValue =>
  useContext<ContextValue>(appDataContext);

export function useProvideAppData(): ContextValue {
  const [items, setItems] = useLocalStorage<Item[]>('items', []);
  const [storeUrl, setStoreUrl] = useLocalStorage('storeUrl', '');
  const [currencySymbol, setCurrencySymbol] = useLocalStorage<CurrencySymbol>('currencySymbol', CurrencySymbol.UAH);
  const [storeName, setStoreName] = useLocalStorage('storeName', '');
  const [discountLabel, setDiscountLabel] = useLocalStorage('discountLabel', '');

  return {
    items,
    setItems,
    storeUrl,
    setStoreUrl,
    currencySymbol,
    setCurrencySymbol,
    storeName,
    setStoreName,
    discountLabel,
    setDiscountLabel,
  };
}
