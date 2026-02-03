import { axios } from "@/lib/axios";

export interface FavoriteItem {
  id: number;
  user_id: number;
  favorable_type: string;
  favorable_id: number;
  favorable: {
    id: number;
    name: { ar: string; en: string };
    image: { file_name: string };
    images: { id: number; file_name: string }[];
    variants: {
      id: number;
      price: number;
      discount: number;
      final_price: number;
      attributes: {
        id: number;
        attribute: {
          id: number;
          name: { ar: string; en: string };
          type: string;
        };
        value: { ar: string; en: string };
      }[];
    }[];
  };
}

export const getFavorites = async (): Promise<FavoriteItem[]> => {
  const response = await axios.get("/favorites", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
