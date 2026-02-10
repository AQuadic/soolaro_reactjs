import ProductSlider, { type ProductItem } from "../ui/ProductSlider";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products/products";
import { getResponsiveImageUrl } from "@/lib/utils/imageUtils";

interface ComplateSelectionProps {
  categoryId: number;
}

const ComplateSelection = ({ categoryId }: ComplateSelectionProps) => {
  const { t } = useTranslation("product");

  const { data, isLoading } = useQuery({
    queryKey: ["category-products", categoryId],
    queryFn: () =>
      getProducts({
        category_id: categoryId,
        sort_by: "created_at",
        sort_order: "desc",
      }),
    enabled: !!categoryId,
  });

  const products: ProductItem[] =
    data?.data
      .filter((product) => product.is_top_rated === 1)
      .map((product) => ({
        image: getResponsiveImageUrl(product.image, "medium"),
        price: product.variants?.[0]?.final_price ?? 0,
        priceColor: product.variants?.[0]?.has_discount ? "#C62828" : "#003D3B",
        height: "213",
        product,
      })) ?? [];

  if (isLoading || !products.length) return null;

  return (
    <ProductSlider
      title={t("complete_selection")}
      seeAllLink={`/category?parent_id=${categoryId}`}
      products={products}
      containerClassName="container md:py-17 py-10"
    />
  );
};

export default ComplateSelection;
