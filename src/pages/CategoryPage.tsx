import { useSearchParams } from "react-router-dom";
import BestSellerCollection from "@/components/category/BestSellerCollection"
import CategoryHero from "@/components/category/CategoryHero"

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const parentId = Number(searchParams.get("parent_id"));

    return (
        <div>
            <CategoryHero  />
            <BestSellerCollection parentId={parentId} />
        </div>
    )
}

export default CategoryPage
