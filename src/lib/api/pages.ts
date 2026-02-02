import { axios } from "../axios";

export interface Page {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  is_active: number;
  order_column: number;
  created_at: string;
  updated_at: string;
  country_id: number | null;
  tenant_id: number | null;
  app_ids: string[];
  image: string | null;
}

export const getPages = async (): Promise<Page[]> => {
  const response = await axios.get<Page[]>("/pages", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};

export const getPageById = async (id: number): Promise<Page> => {
  const response = await axios.get<Page>(`/pages/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};
