import { axios } from "../axios";


export interface CityName {
  ar: string;
  en: string;
}

export interface City {
  id: number;
  tenant_id: number | null;
  name: CityName;
  country_id: number;
  created_at: string;
  updated_at: string;
}

export const getCities = async (): Promise<City[]> => {
  const { data } = await axios.get<City[]>("/city");
  return data;
};

export const getCitiesByCountry = async (
  countryId: number,
): Promise<City[]> => {
  const { data } = await axios.get<City[]>("/city", {
    params: { country_id: countryId },
  });
  return data;
};
