import { axios } from "@/lib/axios";

export interface Address {
  id: number;
  title: string;
  details: string;
  country_id: string;
  city_id: string;
  area_id?: string | null;
  zipcode?: string | null;
  location: { lat: number; lng: number };
  email?: string | null;
  phone?: string | null;
  phone_country?: string | null;
  phone_e164?: string | null;
  phone_national?: string | null;
}

export const getSingleAddress = async (id: number): Promise<Address> => {
  const response = await axios.get(`/addresses/${id}`);
  return response.data;
};
