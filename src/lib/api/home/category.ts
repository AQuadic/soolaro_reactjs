import { axios } from "@/lib/axios";

export interface CategoryName {
  ar: string;
  en: string;
}

export interface CategoryImage {
  file_name: string;
  url: string;
  uuid: string;
  mime_type: string;
  responsive_urls: string[];
}

export interface Category {
  id: number;
  name: CategoryName;
  image: CategoryImage;
  active_products_count: number;
  children_count: number;
}

export interface GetCategoriesResponse {
  data: Category[];
}


export interface GetCategoriesParams {
  parent_only?: boolean;
  parent_id?: number;
  q?: string;
  type?: string;
}


export const getCategories = async (
  params?: GetCategoriesParams
): Promise<Category[]> => {
  const response = await axios.get<GetCategoriesResponse>("/category", {
    params,
  });

  return response.data.data;
};
