import ProductSlider, { type ProductItem } from "../ui/ProductSlider";
import { useTranslation } from "react-i18next";

const products: ProductItem[] = [
  { image: "/images/home/glass1.png", height: "213" },
  { image: "/images/home/glass2.png", priceColor: "#003D3B", height: "213" },
  { image: "/images/home/glass3.png", height: "213" },
];

const NewArrival = () => {
  const { t } = useTranslation("home");

  return (
    <ProductSlider
      title={t("new_arrival")}
      seeAllLink="/"
      products={products}
      containerClassName="container pb-17"
    />
  );
};

export default NewArrival;
