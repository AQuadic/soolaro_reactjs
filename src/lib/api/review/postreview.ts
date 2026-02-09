import { axios } from "@/lib/axios";

export interface CreateReviewRequest {
  reviewable_type: string;
  reviewable_id: string;
  relatable_id?: number;
  relatable_type?: string;
  rating: number;
  comment?: string;
  guest_name?: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const createReview = async (
  reviewData: CreateReviewRequest,
): Promise<CreateReviewResponse> => {
  try {
    const response = await axios.post<CreateReviewResponse>(
      "/review",
      reviewData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create review");
  }
};
