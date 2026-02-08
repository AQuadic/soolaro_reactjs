import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ComplateSelection from "@/components/product_details/ComplateSelection"
import ProductDetailsHeader from "@/components/product_details/ProductDetailsHeader"
import ProductDetialsData from "@/components/product_details/ProductDetialsData"
import ProductExploreShop from "@/components/product_details/ProductExploreShop"
import SeeStyle from "@/components/product_details/SeeStyle"
import YouMayLike from "@/components/product_details/YouMayLike"
import { getProductById } from "@/lib/api/products/singleproduct";
import type { Product } from "@/lib/api/products/products";
import ProductDetailsSkeleton from "@/components/product_details/ProductDetailsSkeleton";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
  });

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !product) return <div>Product not found</div>;

    return (
        <div>
            <ProductDetailsHeader product={product} />
            <ProductDetialsData
              reviewable_id={product.id.toString()}
              description={product.description}
            />
            <ComplateSelection categoryId={product.category.id} />
            <SeeStyle images={product.additional_images.map((img: { url: any; file_name: any; }) => ({ url: img.url, file_name: img.file_name }))} />
            <ProductExploreShop />
            <YouMayLike categoryId={product.category.id}/>
        </div>
    )
}

export default ProductDetailsPage
