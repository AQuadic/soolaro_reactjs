import { axios } from "../axios";

export interface SuggestionPayload {
  city?: string;

  name?: string;

  email?: string;
  phone?: string;
  phone_country?: string;

  type?: string;
  title?: string;

  message: string;
}

export interface SuggestionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const postSuggestion = async (
  payload: SuggestionPayload
): Promise<SuggestionResponse> => {
  if (!payload.email && !payload.phone) {
    throw new Error("Either email or phone is required");
  }

  if (payload.phone && !payload.phone_country) {
    throw new Error("phone_country is required when phone is present");
  }

  const { data } = await axios.post<SuggestionResponse>(
    "/suggestions",
    payload
  );

  return data;
};
