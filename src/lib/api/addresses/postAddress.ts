import { axios } from "@/lib/axios";


export interface AddressRequest {
  title: string;
  country_id: string;
  city_id: string;
  area_id?: string;
  details: string;
  zipcode?: string;
  location: string;
  lat: number;
  lng: number;
  email?: string;
  phone?: string;
  phone_country?: string;
}

export interface AddressResponse {
  id: string;
  title: string;
  country_id: string;
  city_id: string;
  area_id?: string;
  details: string;
  zipcode?: string;
  location: string;
  lat: number;
  lng: number;
  email?: string;
  phone?: string;
  phone_country?: string;
  created_at: string;
  updated_at: string;
}

export const createAddress = async (
  data: AddressRequest,
): Promise<AddressResponse> => {
  if (data.title.length > 255) throw new Error("Title must not exceed 255 characters");
  if (data.zipcode && data.zipcode.length > 20) throw new Error("Zipcode must not exceed 20 characters");
  if (data.email && (data.email.length < 3 || data.email.length > 191)) throw new Error("Email must be between 3-191 characters");
  if (data.phone && !data.phone_country) throw new Error("Phone country is required when phone is present");

  const response = await axios.post<AddressResponse>("/addresses", data);
  return response.data;
};
