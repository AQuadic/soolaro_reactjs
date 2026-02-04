import { axios } from "@/lib/axios";

export const getReviewSummary = async (reviewable_id: string) => {
  const { data } = await axios.get(`/review/summary`, {
    params: { reviewable_id, reviewable_type: "product" },
  });
  return data;
};
