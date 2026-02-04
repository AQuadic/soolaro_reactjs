import ProductSlider, { type ProductItem } from "../ui/ProductSlider";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products/products";

const NewArrival = () => {
  const { t } = useTranslation("home");

  const { data, isLoading } = useQuery({
    queryKey: ["new-arrival-products"],
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

  if (isLoading || !products.length) return null;

  return (
    <ProductSlider
      title={t("new_arrival")}
      seeAllLink="/products?featured=1"
      products={products}
      containerClassName="container md:py-17 py-10"
    />
  );
};

export default NewArrival;
