import ProductSlider, { type ProductItem } from "../ui/ProductSlider";

const products: ProductItem[] = [
  { image: "/images/home/glass1.png", height: "213" },
  { image: "/images/home/glass2.png", priceColor: "#003D3B", height: "213" },
  { image: "/images/home/glass3.png", height: "213" },
];

const NewArrival = () => {
  return (
    <ProductSlider
      title="New Arrival"
      seeAllLink="/"
      products={products}
      containerClassName="container pb-17"
    />
  );
};

export default NewArrival;
