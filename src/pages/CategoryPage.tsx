import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import CategoryHero from "@/components/category/CategoryHero";
import BestSellerCollection from "@/components/category/BestSellerCollection";
import { getCategories } from "@/lib/api/home/category";

const CategoryPage = () => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const parentId = Number(searchParams.get("parent_id"));

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories({ parent_only: true }),
  });

  const currentCategory = categories?.find((cat) => cat.id === parentId);

  const categoryName = currentCategory
    ? i18n.language === "ar"
      ? currentCategory.name.ar
      : currentCategory.name.en
    : "Best Seller Collection";


  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

    return (
        <div>
            <CategoryHero  />
            <BestSellerCollection parentId={parentId} categoryName={categoryName} />
        </div>
    )
}

export default CategoryPage
