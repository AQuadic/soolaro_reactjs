import BreadCrumbs from "../components/general/BreadCrumbs";
import EmptyCart from "../components/cart/EmptyCart";
import CartListing from "../components/cart/CartListing";
import CartSummary from "../components/cart/CartSummary";
import MobileBackHeader from "../components/general/MobileBackHeader";
import ProductSlider, {
  type ProductItem,
} from "../components/ui/ProductSlider";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/lib/api/products/products";
import { getCategories, type Category } from "@/lib/api/home/category";

const CartPage = () => {
  const { t } = useTranslation("cart");
  const { cart, isLoading } = useCartStore();

  const [recommendedProducts, setRecommendedProducts] = useState<ProductItem[]>([]);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);

  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Cart", nameAr: "السلة" },
  ];

  const isEmpty = !cart?.items || cart.items.length === 0;

  useEffect(() => {
    if (!isEmpty) {
      const fetchRecommended = async () => {
        setIsRecommendedLoading(true);

        try {
          const categories: Category[] = await getCategories();
          const categoryIds = categories.slice(0, 3).map(cat => cat.id);
          const results = await Promise.all(
            categoryIds.map(catId => getProducts({ category_id: catId, page: 1 }))
          );
          const allProducts = results.flatMap(res => res.data);
          const uniqueProductsMap = new Map<number, Product>();
          allProducts.forEach(p => {
            if (!uniqueProductsMap.has(p.id)) uniqueProductsMap.set(p.id, p);
          });

          const formatted: ProductItem[] = Array.from(uniqueProductsMap.values()).map(p => ({
            image: p.images[0]?.url || p.image?.url || "/images/placeholder.png",
            product: p,
          }));

          setRecommendedProducts(formatted);
        } catch (err) {
          console.error("Failed to fetch recommended products:", err);
        } finally {
          setIsRecommendedLoading(false);
        }
      };

      fetchRecommended();
    }
  }, [cart, isEmpty]);

  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />
      <div className="container py-6 md:py-10">
        <MobileBackHeader title={t("cart")} />
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#018884]" />
          </div>
        ) : isEmpty ? (
          <>
            <h1 className="hidden md:block text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#0B0B0B]">
              {t("yourCart")}
            </h1>
            <div className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
              <EmptyCart />
            </div>
          </>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
              <CartListing />
            </div>
            {/* Sidebar / Checkout Summary */}
            <div className="w-full lg:w-auto shrink-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <CartSummary disablePopup={false} />
            </div>
          </div>
        )}
      </div>

      {/* You may also like section */}
      {!isEmpty && recommendedProducts.length > 0 && (
        <ProductSlider
          title={t("youMayAlsoLike")}
          products={recommendedProducts}
          containerClassName="container md:pb-20 pb-14"
        />
      )}
    </div>
  );
};

export default CartPage;
