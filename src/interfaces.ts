export interface Item { 
    name: string;
    description: string;
    fullPrice: string;
    centPrice: string;
    country: string;
    oldFullPrice?: string;
    oldCentPrice?: string;
    id: number;
}