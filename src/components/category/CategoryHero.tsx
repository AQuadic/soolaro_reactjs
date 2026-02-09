import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../general/Header";
import { getCategories } from "@/lib/api/home/category";
import { Skeleton } from "../ui/skeleton";
import { getResponsiveImageUrl } from "@/lib/utils/imageUtils";

const CategoryHero = () => {
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent_id");

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories({ parent_only: true }),
  });

  const currentCategory = categories?.find(
    (cat) => cat.id === parseInt(parentId || "0"),
  );

  const backgroundImage = getResponsiveImageUrl(
    currentCategory?.image,
    "large",
  );

  if (isLoading) {
    return (
      <section className="w-full md:h-127.5 h-53.75 relative">
        <Skeleton className="w-full h-full" />
        <Header className="absolute top-0 left-0 w-full z-10" />
      </section>
    );
  }

  return (
    <section
      className="w-full md:h-127.5 h-53.75 relative bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <Header className="absolute top-0 left-0 w-full z-10" />
    </section>
  );
};

export default CategoryHero;
