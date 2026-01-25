import ProductSlider, { type ProductItem } from "../ui/ProductSlider";
import { useTranslation } from "react-i18next";

const products: ProductItem[] = [
  { image: "/images/home/glass2.png", height: "213" },
  { image: "/images/home/glass3.png", priceColor: "#003D3B", height: "213" },
  { image: "/images/home/glass1.png", height: "213" },
];

const BestSeller = () => {
  const { t } = useTranslation("home");

  return (
    <ProductSlider
      title={t("best_seller")}
      seeAllLink="/"
      products={products}
      containerClassName="container md:py-17 py-10"
    />
  );
};

export default BestSeller;
