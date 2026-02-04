import { useState } from "react";
import { Image } from "@/components/ui/image";
import BreadCrumbs from "../general/BreadCrumbs";
import Heart from "../icons/product/Heart";
import MobileHeart from "../icons/product/MobileHeart";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MobileBackHeader from "../general/MobileBackHeader";
import Plus from "../icons/product/Plus";
import Minus from "../icons/product/Minus";
import type { Product } from "@/lib/api/products/products";
import toast from "react-hot-toast";
import FavHeart from "../icons/product/FavHeart";
import { useAuthStore } from "@/store/useAuthStore";
import { toggleFavorite } from "@/lib/api/favorites/toggle";
import { useCartStore } from "@/store/useCartStore";
import { Loader2 } from "lucide-react";
import FavoriteSpinner from "../icons/product/FavoriteSpinner";

interface ProductDetailsHeaderProps {
  product: Product;
}

const ProductDetailsHeader = ({ product }: ProductDetailsHeaderProps) => {
  const { t, i18n } = useTranslation("product");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedVariant = product.variants?.[selectedVariantIndex];
  const [isFavorite, setIsFavorite] = useState(product.is_favorite || false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated());
  const addToCart = useCartStore((state) => state.addToCart);

  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Best Seller", nameAr: "الأكثر مبيعاً", Link: "/explore" },
    {
      nameEn: product.name.en,
      nameAr: product.name.ar,
      Link: `/product_details/${product.id}`,
    },
  ];

  const productImages =
    selectedVariant?.images?.map((img) => img.url) ||
    product.images?.map((img) => img.url) ||
    [];

  const handleToggleFavorite = async () => {
    if (!product.id) return;

    if (!isLoggedIn) {
      toast.error("You need to log in to add favorites");
      return;
    }

    setLoadingFavorite(true);
    try {
      await toggleFavorite({
        favorable_id: product.id,
        favorable_type: "product",
      });
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? t("removed_from_favorites") : t("added_to_favorites"),
      );
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update favorite");
    } finally {
      setLoadingFavorite(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product.id) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product.id, "product", quantity);
      toast.success(t("added_to_cart_success") || "Added to cart");
      setQuantity(1); // Reset quantity after adding
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <section className="w-full md:max-w-[1280px] md:mx-auto px-0 md:px-4">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />

      <Link to="/" className="md:hidden flex items-center gap-3 px-4">
        <MobileBackHeader />
        <p className="text-[#0B0B0B] text-base font-semibold mb-6">
          {i18n.language === "ar" ? product.name.ar : product.name.en}
        </p>
      </Link>
      <div className="md:my-10 flex lg:flex-row flex-col items-center gap-8">
        <div className="w-full md:h-130.75 h-93.75 bg-[#F6F6F6] md:rounded-[24px] flex flex-col items-center justify-around relative">
          <Image
            src={productImages[selectedImageIndex]}
            alt={i18n.language === "ar" ? product.name.ar : product.name.en}
            className="w-full h-full object-cover"
          />

          {isLoggedIn && (
            <div className="md:hidden block absolute top-3 right-3">
              <button
                onClick={handleToggleFavorite}
                disabled={loadingFavorite}
                className={`transition-opacity ${
                  loadingFavorite ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loadingFavorite ? (
                  <FavoriteSpinner />
                ) : isFavorite ? (
                  <FavHeart />
                ) : (
                  <MobileHeart />
                )}
              </button>
            </div>
          )}

          <div className="flex items-center md:gap-6 gap-4 py-6">
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16.25 h-16.25 bg-[#FEFEFE] rounded-xl flex items-center justify-center p-2 cursor-pointer transition-colors relative
                  ${selectedImageIndex === index ? "bg-[#F1F8F8]" : "bg-[#F6F6F6]"}
                `}
              >
                <Image
                  src={img}
                  alt={product.name.en}
                  className="w-[109px] h-[54px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:px-0 px-4 w-full">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-1 md:flex-col flex-row md:items-start items-center justify-between">
              <h2 className="text-[#000000] md:text-2xl text-base font-semibold">
                {product.name[i18n.language as "ar" | "en"] || product.name.en}
              </h2>
              <p className="text-[#025D5B] md:text-[32px] text-xl font-medium leading-[100%] md:mt-6">
                {selectedVariant?.final_price?.toFixed(2)}
              </p>
            </div>
            {isLoggedIn && (
              <div className="md:block hidden">
                <button
                  onClick={handleToggleFavorite}
                  disabled={loadingFavorite}
                  className={`transition-opacity ${
                    loadingFavorite ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loadingFavorite ? (
                    <FavoriteSpinner />
                  ) : isFavorite ? (
                    <FavHeart />
                  ) : (
                    <Heart />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-end md:gap-6 gap-4 md:mt-8 mt-6 mb-6">
            {product.variants.map((variant, index) => {
              const color = variant.attributes.find(
                (a) => a.attribute.type === "Color",
              )?.value?.special_value;

              const variantImage = variant.images?.[0]?.url || productImages[0];

              return (
                <div
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantIndex(index);
                    setSelectedImageIndex(0);
                  }}
                  className={`md:w-[133px] w-[73px] md:h-[133px] h-[73px] rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer transition-colors relative
                    ${selectedVariantIndex === index ? "bg-[#F1F8F8] border-2 border-black" : "bg-[#F6F6F6] border border-transparent"}
                  `}
                >
                  <Image
                    src={variantImage}
                    alt={product.name.en}
                    className="w-[109px] h-[54px] object-cover rounded"
                  />
                </div>
              );
            })}
          </div>
          <div className="md:mt-6 mt-4 flex items-center gap-6">
            <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
              Frame : <span className="text-[#3B3B3B] text-sm">Black</span>
            </p>
            <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
              Lenses : <span className="text-[#3B3B3B] text-sm">Black</span>
            </p>
          </div>


          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full h-14 bg-[#018884] rounded-4xl md:mt-8 mt-6 text-[#FEFEFE] md:text-lg text-base md:font-bold font-semibold flex items-center justify-center disabled:opacity-50"
          >
            {isAddingToCart ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t("add_to_cart")
            )}
          </button>

          <div className="w-full h-14 border border-[#018884] rounded-4xl mt-4 flex items-center justify-center gap-14.5">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1 || isAddingToCart}
              className="text-2xl hover:bg-[#0188841A] w-10 h-10 rounded-full hover:text-[#018884] flex items-center justify-center disabled:opacity-50"
            >
              <Minus />
            </button>
            <p className="text-[#025D5B] text-2xl font-medium">{quantity}</p>
            <button
              onClick={incrementQuantity}
              disabled={isAddingToCart}
              className="text-2xl hover:bg-[#0188841A] w-10 h-10 rounded-full hover:text-[#018884] flex items-center justify-center disabled:opacity-50"
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsHeader;
