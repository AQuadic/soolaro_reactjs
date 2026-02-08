import ProductSlider, { type ProductItem } from "../ui/ProductSlider";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products/products";
import { Skeleton } from "../ui/skeleton";

const BestSeller = () => {
  const { t } = useTranslation("home");

  const { data, isLoading } = useQuery({
    queryKey: ["best-seller-products"],
    queryFn: () =>
      getProducts({
        is_featured: true,
        sort_by: "created_at",
        sort_order: "desc",
      }),
  });

  const products: ProductItem[] =
    data?.data.map((product) => ({
      image: product.image?.url,
      price: product.variants?.[0]?.final_price ?? 0,
      priceColor: product.variants?.[0]?.has_discount ? "#C62828" : "#003D3B",
      height: "213",
      product: product,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="container md:py-17 py-10">
        <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold leading-[100%] md:mb-12 mb-4">{t("best_seller")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[213px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ProductSlider
      title={t("best_seller")}
      seeAllLink="/explore?featured=1"
      products={products}
      containerClassName="container md:py-17 py-10"
    />
  );
};

export default BestSeller;
