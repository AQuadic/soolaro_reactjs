import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/home/category";
import BestSellerCollection from "@/components/category/BestSellerCollection"
import CategoryHero from "@/components/category/CategoryHero"

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const parentId = Number(searchParams.get("parent_id"));

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const category = categories?.find((cat) => cat.id === parentId);

    return (
        <div>
            <CategoryHero image={category?.image?.url} name={category?.name} />
            <BestSellerCollection parentId={parentId} />
        </div>
    )
}

export default CategoryPage
