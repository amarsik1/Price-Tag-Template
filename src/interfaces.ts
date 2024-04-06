import { Dispatch, SetStateAction } from 'react';

export interface LegacyItem {
  name: string;
  description: string;
  fullPrice: string;
  centPrice: string;
  country: string;
  oldFullPrice: string;
  oldCentPrice: string;
  isDiscount: boolean;
  numberCopies: number;
  id: number;
}

export interface Item {
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  country: string;
  numberCopies: number;
  id: number;
}

export interface UseTableItemTemplate {
  selected?: boolean;
  id: number;
}

export type UseTableItemGeneric<T> = UseTableItemTemplate & T;

export interface ContextValue extends TagConfig {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  setCurrencySymbol: Dispatch<SetStateAction<TagConfig['currencySymbol']>>;
  setStoreName: Dispatch<SetStateAction<TagConfig['storeName']>>;
  setDiscountLabel: Dispatch<SetStateAction<TagConfig['discountLabel']>>;
  setStoreUrl: Dispatch<SetStateAction<TagConfig['storeUrl']>>;
}

export enum CurrencySymbol {
  UAH = '₴',
  USD = '$',
  EUR = '€',
}

export interface TagConfig {
  currencySymbol: CurrencySymbol;
  storeName: string;
  storeUrl: string;
  discountLabel: string;
  // unit: string; // шт / л / кг
}
