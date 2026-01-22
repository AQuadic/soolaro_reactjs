import ProductSlider, { type ProductItem } from "../ui/ProductSlider";

const products: ProductItem[] = [
  { image: "/images/home/glass1.png", height: "213" },
  { image: "/images/home/glass2.png", priceColor: "#003D3B", height: "213" },
  { image: "/images/home/glass3.png", height: "213" },
];

const YouMayLike = () => {
  return (
    <ProductSlider
      title="You may also like"
      products={products}
      containerClassName="container md:pb-20 pb-14"
    />
  );
};

export default YouMayLike;
