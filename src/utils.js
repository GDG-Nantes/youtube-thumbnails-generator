import categories from "./data/categories.json";

export const getCategory = category => {
  return categories.find(cat => cat.key === category).classname;
};
