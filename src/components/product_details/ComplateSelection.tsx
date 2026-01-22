import ProductSlider, { type ProductItem } from "../ui/ProductSlider";

const products: ProductItem[] = [
  { image: "/images/home/glass1.png", height: "213" },
  { image: "/images/home/glass2.png", priceColor: "#003D3B", height: "213" },
  { image: "/images/home/glass3.png", height: "213" },
];

const ComplateSelection = () => {
  return (
    <ProductSlider
      title="Complete your selection"
      products={products}
      containerClassName="container md:py-17 py-12"
    />
  );
};

export default ComplateSelection;
