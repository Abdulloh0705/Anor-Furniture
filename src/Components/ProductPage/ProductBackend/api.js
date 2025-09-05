export const API_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};
