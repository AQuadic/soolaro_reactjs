import { axios } from "@/lib/axios";

export interface ToggleFavoriteRequest {
  favorable_id: number;
  favorable_type: string;
}

export interface ToggleFavoriteResponse {
  success: boolean;
  message: string;
  data?: {
    favorite_id?: number;
    is_favorited?: boolean;
  };
}

export const toggleFavorite = async (
  body: ToggleFavoriteRequest
): Promise<ToggleFavoriteResponse> => {
  const response = await axios.post<ToggleFavoriteResponse>(
    "/favorites/toggle",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
