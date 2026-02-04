import { axios } from "@/lib/axios";

export type ProductSortBy = "id" | "price" | "created_at" | "updated_at";
export type SortOrder = "asc" | "desc";

export interface GetProductsParams {
  sort_by?: ProductSortBy;
  sort_order?: SortOrder;
  only_discount?: boolean;
  is_featured?: boolean;
  is_top_rated?: boolean;
  page?: number;
}

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Image {
  id?: number;
  uuid: string;
  size?: number;
  url: string;
  responsive_urls: string[];
}

export interface Attribute {
  id: number;
  attribute: {
    id: number;
    name: LocalizedText;
    type: string;
  };
  value: {
    id: number;
    value: LocalizedText;
    special_value: string;
  };
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  barcode: string | null;
  price: number;
  discount: number | null;
  has_discount: boolean;
  final_price: number;
  is_out_of_stock: boolean;
  stock: number;
  is_stock: boolean;
  is_active: boolean;
  group_addons: unknown[];
  images: Image[];
  attributes: Attribute[];
}


export interface Category {
  id: number;
  name: LocalizedText;
  slug: string | null;
  is_active: number;
  image: Image;
}

export interface Product {
  id: number;
  image: Image;
  images: Image[];
  name: LocalizedText;
  description: LocalizedText;
  short_description: LocalizedText;
  brand_id: number | null;
  category_id: number;
  order_column: number;
  is_active: number;
  is_top_rated: number;
  is_featured: number;
  is_favorite: boolean | null;
  rating: number;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
  category: Category;
}


export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
}


export interface GetProductsResponse {
  data: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export const getProducts = async (
  params?: GetProductsParams
): Promise<GetProductsResponse> => {
  const response = await axios.get<GetProductsResponse>(
    `/products`,
    {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
