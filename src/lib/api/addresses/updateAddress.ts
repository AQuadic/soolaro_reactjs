import { axios } from "@/lib/axios";
import type { Address } from "./getAddresses";

export interface UpdateAddressPayload {
  title: string;
  country_id: string;
  city_id: string;
  area_id?: string;
  details: string;
  zipcode?: string;
  location: { lat: number; lng: number };
  email?: string;
  phone?: string;
  phone_country?: string;
}

export const updateAddress = async (
  id: number,
  data: UpdateAddressPayload
): Promise<Address> => {
  const response = await axios.put(`/addresses/${id}`, data);
  return response.data;
};
