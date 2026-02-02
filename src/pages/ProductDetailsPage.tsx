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
import { Loader } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
  });

  if (isLoading) return <div className="flex items-center justify-center py-20">
    <Loader />
  </div>
  if (error || !product) return <div>Product not found</div>;

    return (
        <div>
            <ProductDetailsHeader product={product} />
            <ProductDetialsData />
            <ComplateSelection />
            <SeeStyle />
            <ProductExploreShop />
            <YouMayLike />
        </div>
    )
}

export default ProductDetailsPage
