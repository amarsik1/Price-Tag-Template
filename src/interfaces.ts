export interface Item {
    name: string;
    description: string;
    fullPrice: string;
    centPrice: string;
    country: string;
    oldFullPrice: string;
    oldCentPrice: string;
    isDiscount: boolean;
    id: number;
}

export interface UseTableItemTemplate {
    selected?: boolean;
    id: number;
}

export type UseTableItemGeneric<T> = UseTableItemTemplate & T;