import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/api/products/products";
import Heart from "../icons/product/Heart";
import toast from "react-hot-toast";
import { toggleFavorite } from "@/lib/api/favorites/toggle";
import FavHeart from "../icons/product/FavHeart";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import type { FavoriteItem } from "@/lib/api/favorites/getFavorites";

type CardProps = {
  image?: string;
  priceColor?: string;
  width?: string;
  height?: string;
  showHeart?: boolean;
  product?: Product;
};

const Card = ({
  image,
  priceColor = "#0B0B0B",
  width = "w-88.75",
  height = "h-44.25",
  showHeart = false,
  product,
}: CardProps) => {
  const {t, i18n } = useTranslation('product');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isFavorite, setIsFavorite] = useState(product?.is_favorite || false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated());
  const queryClient = useQueryClient();

  const defaultColors = [
    "bg-[linear-gradient(135deg,#754B37_50%,#E98900_50%)]",
    "bg-[linear-gradient(135deg,#AE1111_50%,#232322_50%)]",
    "bg-[linear-gradient(135deg,#B7BFF9_50%,#0008E9_50%)]",
    "bg-[linear-gradient(135deg,#6A6A6A_50%,#0F0F0F_50%)]",
  ];

  const selectedVariant = product?.variants?.[selectedColor];
  const productImage =
    selectedVariant?.images?.[0]?.url ||
    product?.image?.url ||
    image ||
    "";

  const productName = product
    ? product.name[i18n.language as keyof typeof product.name] ||
      product.name.en
    : "";
const productPrice = Number(selectedVariant?.final_price || 0);
const originalPrice = selectedVariant?.price;
const hasDiscount = selectedVariant?.has_discount;
  const productId = product?.id;

  const getProductColors = () => {
    if (!product?.variants || product.variants.length === 0) {
      return defaultColors;
    }

    const colorVariants = product.variants
      .filter((variant) => {
        const colorAttr = variant.attributes.find(
          (attr) =>
            attr.attribute.type === "Color" ||
            attr.attribute.type === "color" ||
            attr.attribute.name.en.toLowerCase().includes("color")
        );
        return colorAttr !== undefined;
      })
      .slice(0, 4);

    if (colorVariants.length === 0) {
      return defaultColors;
    }

    return colorVariants.map((variant) => {
      const colorAttr = variant.attributes.find(
        (attr) =>
          attr.attribute.type === "Color" ||
          attr.attribute.type === "color" ||
          attr.attribute.name.en.toLowerCase().includes("color")
      );

      if (colorAttr?.value.special_value) {
        // Handle hex color codes
        if (colorAttr.value.special_value.startsWith("#")) {
          return colorAttr.value.special_value;
        }
        return colorAttr.value.special_value;
      }

      return defaultColors[0];
    });
  };

  const colors = getProductColors();

  const discountPercentage =
    hasDiscount && originalPrice
      ? Math.round(
          ((Number(originalPrice) - productPrice) / Number(originalPrice)) *
            100,
        )
      : 0;

  const handleToggleFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!productId) return;

    setLoadingFavorite(true);
    try {
      await toggleFavorite({
        favorable_id: productId,
        favorable_type: "product",
      });

      toast.success(isFavorite ? t('removed_from_favorites') : t('added_to_favorites'));

      setIsFavorite(!isFavorite);

      queryClient.setQueryData<FavoriteItem[]>(["favorites"], (oldFavorites) => {
        if (!oldFavorites) return [];
        return oldFavorites.filter((fav) => fav.favorable.id !== productId);
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update favorite");
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={productId ? `/product_details/${productId}` : "/product_details"}
      >
        <div className="bg-[#F6F6F6] rounded-4xl flex items-center justify-center relative overflow-hidden w-[378px] h-[349px]">
          {hasDiscount && discountPercentage > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              className="absolute md:top-4 top-2 md:left-4 left-2 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white md:px-3 px-2 md:py-1.5 py-1 rounded-full shadow-lg"
            >
              <span className="md:text-sm text-xs font-bold">
                -{discountPercentage}%
              </span>
            </motion.div>
          )}

          {showHeart && isLoggedIn && (
            <button
              onClick={handleToggleFavorite}
              disabled={loadingFavorite}
              className="absolute md:top-4 top-2 md:right-4 right-2 z-20"
            >
              {isFavorite ? <FavHeart /> : <Heart />}
            </button>
          )}

          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={productImage}
            alt={productName}
            className={`w-full object-cover z-10`}
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {product?.variants?.[0]?.is_out_of_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-15">
              <span className="text-white font-bold md:text-xl text-base bg-red-600 px-4 py-2 rounded-lg">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>

        <h2 className="text-[#000000] md:text-xl text-xs font-medium mt-4 text-center">
          {productName}
        </h2>

        <div className="flex items-center justify-center gap-2 md:mt-4 mt-2">
          <h2
            className="md:text-2xl text-base font-medium leading-[100%] flex items-center gap-1"
            style={{ color: priceColor }}
          >
            {productPrice.toFixed(2)}
            <img
              src="/images/currency.png"
              alt="currency"
              className="w-[27px] h-6"
            />
          </h2>

          {hasDiscount && originalPrice && (
            <h2 className="md:text-lg text-sm font-medium leading-[100%] flex items-center gap-1 text-gray-400 line-through">
              {originalPrice.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="currency"
                className="w-[20px] h-[18px] opacity-50"
              />
            </h2>
          )}
        </div>
      </Link>

      <div className="md:mt-6 mt-3 flex gap-3">
        {colors.map((bg, index) => {
          const isHexColor = typeof bg === 'string' && bg.startsWith('#');
          
          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedColor(index);
              }}
              className={`
                md:w-7 w-5 md:h-7 h-5 rounded-full
                ${!isHexColor ? bg : ''}
                ${
                  selectedColor === index
                    ? "ring-[3px] ring-[#0B0B0B] ring-offset-2"
                    : ""
                }
                transition-all duration-200 hover:scale-110
              `}
              style={
                isHexColor
                  ? { backgroundColor: bg }
                  : {}
              }
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Card;
