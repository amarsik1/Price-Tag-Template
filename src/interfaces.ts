import { Dispatch, SetStateAction } from "react";

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

export interface ContextValue {
    items: Item[];
    setItems: Dispatch<SetStateAction<Item[]>>
}