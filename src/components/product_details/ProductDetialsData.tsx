import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EmptyStar from "../icons/product/EmptyStar";
import FullStar from "../icons/product/FullStar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
import { createReview } from "@/lib/api/review/postreview";
import { getReviewSummary } from "@/lib/api/review";
import { getReviewableReviews } from "@/lib/api/review/getReviewableReviews";

interface ProductDetialsDataProps {
  reviewable_id: string;
  description?: { ar: string; en: string };
}

const ProductDetialsData: React.FC<ProductDetialsDataProps> = ({
  reviewable_id,
  description,
}) => {
  const { t, i18n } = useTranslation("product");
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [selectedStar, setSelectedStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: summaryData } = useQuery({
    queryKey: ["review-summary", reviewable_id],
    queryFn: () => getReviewSummary(reviewable_id),
    enabled: !!reviewable_id,
  });

  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
  queryKey: ["reviewable-reviews", reviewable_id],
  queryFn: () =>
    getReviewableReviews({
      reviewable_id,
      reviewable_type: "product",
    }),
  enabled: !!reviewable_id,
});


  const ratingsDistribution = summaryData
    ? Object.entries(summaryData)
        .map(([stars, count]) => ({
          stars: Number(stars),
          count,
          percent: 0,
        }))
        .sort((a, b) => b.stars - a.stars)
    : [];

  const totalReviews = ratingsDistribution.reduce((acc, r) => acc + r.count, 0);
  ratingsDistribution.forEach((r) => {
    r.percent = totalReviews ? Math.round((r.count / totalReviews) * 100) : 0;
  });

  const averageRating = totalReviews
    ? ratingsDistribution.reduce((acc, r) => acc + r.stars * r.count, 0) /
      totalReviews
    : 0;

  const handleSubmitReview = async () => {
    // Prevent duplicate submissions
    if (isSubmitting) return;

    if (!name || !selectedStar) {
      toast.error(t("please_fill_all_fields"));
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview({
        reviewable_type: "product",
        reviewable_id,
        rating: selectedStar,
        comment,
      });

      // toast.success(t("review_success"));
      setName("");
      setComment("");
      setSelectedStar(0);

      queryClient.invalidateQueries({
        queryKey: ["review-summary", reviewable_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviewable-reviews", reviewable_id],
      });
    } catch (error: any) {
      toast.error(error.message || t("review_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container">
      <div className="md:mt-17 mt-6">
        <Tabs defaultValue="description">
          <TabsList className="bg-transparent flex lg:mb-8 mb-4 md:gap-4 w-full overflow-x-auto justify-start gap-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
            >
              {t("description")}
            </TabsTrigger>
            {/* <TabsTrigger
              value="measurement"
              className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
            >
              {t("measurement")}
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
            >
              {t("shipping")}
            </TabsTrigger> */}
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
            >
              {t("reviews")}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="text-[#3B3B3B] text-base font-semibold leading-[150%]"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: description
                  ? description[i18n.language as "ar" | "en"]
                  : "",
              }}
            />
          </TabsContent>
          {/* <TabsContent value="measurement">
            <ul className="list-disc px-10">
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Lens Width: 52 mm
              </li>
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Bridge Width: 18 mm
              </li>
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Temple Length: 140 mm
              </li>
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Lens Height: 45 mm
              </li>
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Frame Width: 140 mm
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="shipping">
            <ul className="list-disc px-10">
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Shipping
                <p className="text-[#3B3B3B] text-base font-medium -mx-7.5">
                  Final shipping fees are calculated at checkout based on weight
                  and location. Please note that import duties and taxes may be
                  charged on delivery
                </p>
              </li>
              <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                Returns
                <p className="text-[#3B3B3B] text-base font-medium -mx-7.5">
                  If something is not quite right send your glasses back for a
                  full refund.
                </p>
              </li>
            </ul>
          </TabsContent> */}
          <TabsContent value="reviews" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <div className="flex lg:flex-row flex-col gap-8">
              <div className="w-full h-full p-6 border border-[#DEDDDD] rounded-4xl">
                <p className="text-[#0B0B0B] text-xl font-medium">
                  {t("submit_review")}
                </p>
                <div className="mt-7 flex items-center justify-between">
                  <h2 className="text-[#000000] text-base font-bold">
                    {t("add_your_rate")}
                  </h2>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) =>
                      selectedStar >= star ? (
                        <FullStar
                          key={star}
                          className="cursor-pointer"
                          onClick={() => setSelectedStar(star)}
                        />
                      ) : (
                        <EmptyStar
                          key={star}
                          className="cursor-pointer"
                          onClick={() => setSelectedStar(star)}
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-[#0B0B0B] text-base font-semibold">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 border border-[#DEDDDD] rounded-[20px] mt-3 px-4"
                    placeholder={t("enter_name")}
                  />
                </div>

                <div className="mt-6">
                  <label className="text-[#0B0B0B] text-base font-semibold">
                    {t("review")}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full md:h-[113px] h-18.25 border border-[#DEDDDD] rounded-4xl mt-3 p-4"
                  />
                </div>

                <button
                  className="w-full h-14 bg-[#018884] rounded-4xl mt-6 text-[#FEFEFE] text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {t("send_review")}
                </button>
              </div>

              <div className="w-full h-full md:px-6 md:py-8 md:bg-[#F6F6F6] rounded-4xl">
                <h2 className="text-[#0B0B0B] md:text-xl text-base font-medium">
                  {t("average_rating")}
                </h2>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-[#000000] md:text-lg text-sm font-medium">
                    {averageRating.toFixed(1)}
                  </p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FullStar key={star} />
                    ))}
                  </div>
                </div>

                {ratingsDistribution.map((r) => (
                  <div className="flex items-center mt-4" key={r.stars}>
                    <a
                      href="#"
                      className="text-[#000000] text-sm font-medium hover:underline"
                    >
                      {r.stars}
                    </a>
                    <div className="w-full md:h-2 h-1 mx-4 bg-[#EAE9E9] rounded-4xl">
                      <div
                        className="md:h-2 h-1 bg-[#018884] rounded-4xl"
                        style={{ width: `${r.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-[#000000] text-sm font-medium">
                      {r.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:mt-10 mt-6">
              <h2 className="text-[#0B0B0B] md:text-[40px] text-xl font-semibold">
                {t("cutomer_review")}
              </h2>

              {isReviewsLoading && (
                <div>
                  <Loader />
                </div>
              )}

              {!isReviewsLoading && reviews?.length === 0 && (
                <p className="mt-6 text-center text-gray-500">
                  {t("no_reviews")}
                </p>
              )}

              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border border-[#DEDDDD] md:mt-10 mt-8 rounded-[20px]"
                >
                  <h3 className="text-[#3B3B3B] text-base font-medium">
                    {review.name}
                  </h3>

                  <div className="flex items-center mt-4 gap-1">
                    {[1, 2, 3, 4, 5].map((star) =>
                      star <= review.rating ? (
                        <FullStar key={star} />
                      ) : (
                        <EmptyStar key={star} />
                      )
                    )}
                  </div>

                  <p className="text-[#0B0B0B] text-lg font-medium mt-3.5">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductDetialsData;
