export const createGoodsSortObject = (sortDirection: string) => {
  if (sortDirection === "price_asc") return { price: 1 };
  if (sortDirection === "price_desc") return { price: -1 };

  return {
    isFavorite: -1,
  };
};
