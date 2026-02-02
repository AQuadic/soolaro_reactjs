import { axios } from "@/lib/axios";

export interface SliderImage {
  file_name: string;
  url: string;
  uuid: string;
  mime_type: string;
  responsive_urls: string[];
}

export interface Slider {
  name: string;
  title: string | null;
  description: string | null;
  text_button: string | null;
  url: string;
  ar_image: SliderImage;
  en_image: SliderImage;
}

export interface GetSlidersResponse {
  data: Slider[];
}

export interface GetSlidersParams {
  perPage?: number;
  search?: string;
  pagination?: string;
}

export const getSliders = async (params: GetSlidersParams = {}): Promise<Slider[]> => {
  try {
    const response = await axios.get<GetSlidersResponse>("/slider", {
      params,
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch sliders:", error);
    throw error;
  }
};
