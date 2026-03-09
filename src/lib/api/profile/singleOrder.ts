import { axios } from "@/lib/axios";

interface VariantAttribute {
  id: number;
  attribute: { id: number; name: { ar: string; en: string }; type: string };
  value: { id: number; value: { ar: string; en: string }; special_value: string };
}

interface VariantImage {
  id: number;
  uuid: string;
  url: string;
  responsive_urls: string[];
}

interface Variant {
  id: number;
  product_id: number;
  sku: string;
  barcode: string | null;
  price: number;
  final_price: number;
  discount: number | null;
  has_discount: boolean;
  is_active: boolean;
  is_stock: boolean;
  is_out_of_stock: boolean;
  stock: number;
  images: VariantImage[];
  attributes: VariantAttribute[];
  group_addons: unknown[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  code: string;
  order_code: string;
  product_name: { en: string; ar: string };
  price: number;
  quantity: number;
  subtotal: number;
  discount_amount: number;
  tax: number;
  total: number;
  status: string;
  is_reviewed: boolean;
  custom_data: unknown[];
  created_at: string;
  updated_at: string;
  variant: Variant;
  productable?: {
    image?: {
      id: number;
      uuid: string;
      url: string;
      responsive_urls: string[];
    };
  };
}

export interface Order {
  id: number;
  code: string;
  tracking_number: string | null;
  status: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  delivery_expect: string;

  sub_total: number;
  shipping: number;
  tax: number;
  total: number;
  discount_amount: number;
  total_discount: number;
  products_discount: number;

  phone: string;
  phone_e164: string;
  phone_national: string;
  phone_country: string;
  phone_normalized: string;
  email: string;
  user_name: string;

  address_details: string | null;
  address_lat: string | null;
  address_lng: string | null;

  client: null | object;
  client_id: string;
  client_type: string;
  session_id: string;

  is_reviewed: boolean;
  reviews: unknown[];

  orderItems: OrderItem[];
}

interface OrderResponse {
  order: Order;
}

export const getOrderById = async (id: string | number): Promise<Order> => {
  const response = await axios.get<OrderResponse>(`/orders/id/${id}`);
  return response.data.order;
};


export const trackOrderById = async (
    id: string | number,
    email?: string,
    phone?: string
): Promise<Order> => {
    const params = new URLSearchParams();
    if (email) params.append("email", email);
    if (phone) params.append("phone", phone);

    const response = await axios.get<OrderResponse>(
        `/orders/id/${id}?${params.toString()}`
    );
    return response.data.order;
};