import ComplateSelection from "@/components/product_details/ComplateSelection"
import ProductDetailsHeader from "@/components/product_details/ProductDetailsHeader"
import ProductDetialsData from "@/components/product_details/ProductDetialsData"

const ProductDetailsPage = () => {
    return (
        <div>
            <ProductDetailsHeader />
            <ProductDetialsData />
            <ComplateSelection />
        </div>
    )
}

export default ProductDetailsPage
