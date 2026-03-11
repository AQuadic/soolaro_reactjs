import { axios } from "../axios";
import { getCartSessionId } from "./cart";

export interface CheckoutRequest {
  // Session & Payment
  session_id?: string;
  payment_method: string; // "stripe"

  // User Details
  user_name: string;
  email: string;
  phone: string;
  phone_country: string;

  // Address
  country_id: string;
  city_id: string;
  area_id?: string;
  details?: string;

  // Coupon
  coupon_code?: string;

  // Items - optional if already in cart/session
  items?: Array<{
    itemable_id: number;
    itemable_type: string;
    quantity: number;
  }>;
}

export interface CheckoutResponse {
  payment_url: any;
  success: boolean;
  message: string;
  data?: {
    order_id?: string | number;
    payment_url?: string;
    [key: string]: any;
  };
}

export const createCheckout = async (
  checkoutData: CheckoutRequest,
): Promise<CheckoutResponse> => {
  // Get session_id for guest users if not authenticated
  const sessionId = getCartSessionId();

  const payload = {
    ...checkoutData,
    session_id: sessionId,
  };

  const { data } = await axios.post<CheckoutResponse>(
    "/orders/checkout",
    payload,
  );
  return data;
};
