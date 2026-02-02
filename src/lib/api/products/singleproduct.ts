import { axios } from "@/lib/axios";
import type { Product } from "./products";

export const getProductById = async (id: string | number): Promise<Product> => {
  const response = await axios.get<Product>(`/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};
