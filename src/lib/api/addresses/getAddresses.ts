import { axios } from "@/lib/axios";

export interface Address {
  id?: number;
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  [key: string]: any;
}

export const getAddresses = async (): Promise<Address[]> => {
  const response = await axios.get<Address[]>("/addresses");
  return response.data;
};