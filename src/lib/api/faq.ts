import { axios } from "../axios";

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Faq {
  id: number;
  question: LocalizedText;
  answer: LocalizedText;
  is_active: number;
  order_column: number;
  created_at: string;
  updated_at: string;
  country_id: number | null;
  type: string;
  useful_uses_count: number;
  unuseful_uses_count: number;
  tenant_id: number | null;
}

export interface PaginationResponse<T> {
  current_page: number;
  current_page_url: string;
  data: T[];
  first_page_url: string;
  from: number | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
}

export interface GetFaqsParams {
  page?: number;
}

export const getFaqs = async (
  params?: GetFaqsParams
): Promise<PaginationResponse<Faq>> => {
  const { data } = await axios.get("/faqs", {
    params,
  });

  return data;
};
