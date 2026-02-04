import { axios } from "@/lib/axios";

export type ReviewSummaryResponse = Record<number, number>;

export const getReviewSummary = async (
  reviewable_id: string
): Promise<ReviewSummaryResponse> => {
  const { data } = await axios.get<ReviewSummaryResponse>(`/review/summary`, {
    params: { reviewable_id, reviewable_type: "product" },
  });
  return data;
};

export const getReviewableReviews = async (reviewable_id: string) => {
  const { data } = await axios.get(`/review/reviewable`, {
    params: { reviewable_id, reviewable_type: "product" },
  });
  return data;
};
