import { CATEGORIES } from "./constants";

export const getSubCategory = (category) => {
  let subcategories = CATEGORIES[category];
  if (!subcategories) {
    return [];
  }
  return subcategories;
};
