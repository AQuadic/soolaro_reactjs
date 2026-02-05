import { axios } from "../axios";

export interface CountryName {
  ar: string;
  en: string;
}

export interface Country {
  id: number;
  name: CountryName;
  code: string | null;
  currency: string;
  currency_text: string[];
  language_code: string;
  is_active: boolean;
}

interface CountriesResponse {
  data: Country[];
}


export const getCountries = async (): Promise<Country[]> => {
  const { data } = await axios.get<CountriesResponse>("/country");
  return data.data;
};
