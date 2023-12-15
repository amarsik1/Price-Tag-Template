import { Item, LegacyItem } from "interfaces";

export const priceFormatter = (price: string): string => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatLegacyItems = (items: (LegacyItem & Item)[]): Promise<Item[]> => {
  return new Promise((resolve) => {
    const result = items.map((item) => {
      const isLegacyItem = Boolean(item.fullPrice);
      if (!isLegacyItem) return item;

      const {
        name,
        description,
        country,
        id,
        numberCopies,
        fullPrice,
        centPrice,
        oldCentPrice,
        oldFullPrice,
      } = item;

      const oldPrice = (oldCentPrice && oldFullPrice) && `${oldFullPrice}.${oldCentPrice}`

      return {
        name,
        country,
        description,
        numberCopies,
        id,
        price: `${fullPrice}.${centPrice}`,
        oldPrice,
      };
    });

    resolve(result);
  })
}