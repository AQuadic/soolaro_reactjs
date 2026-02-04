import MobileBackHeader from "@/components/general/MobileBackHeader";
import Card from "@/components/home/GlassCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getFavorites, type FavoriteItem } from "@/lib/api/favorites/getFavorites";
import { Skeleton } from "@/components/ui/skeleton";
import WhishlistEmptyState from "./WishlistEmptyState";

const Wishlist = () => {
  const { t } = useTranslation("profile");

  const { data: favorites, isLoading } = useQuery<FavoriteItem[]>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const skeletons = Array.from({ length: 6 });

    return (
        <section className="container">
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold mb-8 md:block hidden">
            {t("myWishlist")}
        </h1>

        <Link to="/" className="md:hidden flex items-center gap-3">
            <MobileBackHeader />
            <p className="text-[#0B0B0B] text-base font-semibold mb-6">
            {t("favorite")}
            </p>
        </Link>

        {isLoading ? (
            <div className="grid md:grid-cols-3 grid-cols-2 gap-8">
            {skeletons.map((_, index) => (
                <div key={index} className="h-[258px] w-full rounded-4xl overflow-hidden">
                <Skeleton className="h-full w-full" />
                </div>
            ))}
            </div>
        ) : favorites && favorites.length > 0 ? (
            <div className="flex flex-wrap gap-8">
            {favorites.map((item) => (
                <Card
                key={item.id}
                showHeart
                product={item as any}
                />
            ))}
            </div>
        ) : (
            <WhishlistEmptyState />
        )}
        </section>
    );
};

export default Wishlist;
