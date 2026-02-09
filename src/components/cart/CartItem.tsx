import { Plus, Minus, Loader2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Link } from "react-router-dom";
import RemoveItemPopup from "./RemoveItemPopup";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { CartItem as CartItemType } from "@/lib/api/cart";
import { getResponsiveImageUrl } from "@/lib/utils/imageUtils";

interface CartItemProps {
  item: CartItemType;
}

const DeleteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.3301 16.5H13.6601"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 12.5H14.5"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartItem = ({ item }: CartItemProps) => {
  const { t, i18n } = useTranslation("cart");
  const { updateItemQuantity, removeItem } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const price = item.variant.has_discount
    ? item.variant.final_price
    : item.variant.price;
  const total = price * item.quantity;
  const name =
    typeof item.name === "object"
      ? item.name[i18n.language as keyof typeof item.name] || item.name.en
      : item.name;
  const image =
    getResponsiveImageUrl(item.image, "thumbnail") || "/images/home/glass1.png";

  const handleIncrease = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await updateItemQuantity(item.id, item.quantity + 1);
    } catch {
      toast.dismiss();
      toast.error(t("failed_update_quantity"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = async () => {
    if (isUpdating) return;
    if (item.quantity <= 1) return;
    setIsUpdating(true);
    try {
      await updateItemQuantity(item.id, item.quantity - 1);
    } catch {
      toast.dismiss();
      toast.error(t("failed_update_quantity"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeItem(item.id);
      toast.dismiss();
      toast.success(t("item_removed"));
    } catch {
      toast.dismiss();
      toast.error(t("failed_remove_item"));
    } finally {
      setIsRemoving(false);
    }
  };

  const QuantityControls = () => (
    <>
      <button
        aria-label="Decrease quantity"
        onClick={handleDecrease}
        disabled={isUpdating || item.quantity <= 1}
        className="w-8 h-8 flex items-center justify-center text-[#0B0B0B] hover:text-[#018884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-5 h-5" />
        )}
      </button>

      <span className="text-xl font-medium text-[#0B0B0B] w-8 text-center">
        {item.quantity}
      </span>

      <button
        aria-label="Increase quantity"
        onClick={handleIncrease}
        disabled={isUpdating}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E6F3F3] text-[#018884] hover:bg-[#018884] hover:text-white transition-all duration-300 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Design */}
      <div className="md:hidden flex flex-col gap-4 mb-6">
        {/* Top Card: Product Info */}
        <div className="flex items-center justify-between p-4 border border-[#EAEAEA] rounded-3xl bg-white relative">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#F9F9F9] rounded-xl flex items-center justify-center shrink-0">
              <Image
                src={image}
                alt={name}
                className="w-full h-full object-contain mix-blend-multiply p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to={`/product_details/${item.itemable_id}`}
                className="text-lg font-medium text-[#0B0B0B]"
              >
                {name}
              </Link>
              <p className="text-[#018884] font-medium text-base flex items-center gap-1">
                {price.toFixed(2)}
                <img
                  src="/images/currency.png"
                  alt="currency"
                  className="w-4.5 h-4.5"
                />
              </p>
            </div>
          </div>

          <RemoveItemPopup onConfirm={handleRemove}>
            <button
              aria-label="Remove item"
              disabled={isRemoving}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F4F4F4] hover:bg-[#ffe5e5] transition-colors duration-300 disabled:opacity-50"
            >
              {isRemoving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <DeleteIcon />
              )}
            </button>
          </RemoveItemPopup>
        </div>

        {/* Bottom Card: Quantity */}
        <div className="flex items-center justify-center gap-8 py-3 border border-[#EAEAEA] rounded-full bg-white">
          <QuantityControls />
        </div>
      </div>

      {/* Desktop Design */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center py-8 border-b border-[#EAEAEA] last:border-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Product Section */}
        <div className="col-span-6 flex items-start gap-3">
          {/* Delete Button - Top Left aligned with image */}
          <RemoveItemPopup onConfirm={handleRemove}>
            <button
              aria-label="Remove item"
              disabled={isRemoving}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F4F4F4] hover:bg-[#ffe5e5] transition-colors duration-300 shrink-0 absolute -mt-4 cursor-pointer disabled:opacity-50"
            >
              {isRemoving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <DeleteIcon />
              )}
            </button>
          </RemoveItemPopup>

          {/* Image */}
          <div className="w-32 h-32 bg-[#F9F9F9] rounded-2xl flex items-center justify-center shrink-0 p-2">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 pt-2 ml-2">
            <Link
              to={`/product_details/${item.itemable_id}`}
              className="text-xl font-medium text-[#0B0B0B] hover:text-[#018884] transition-colors"
            >
              {name}
            </Link>
            <p className="text-[#018884] font-medium text-lg underline underline-offset-4 decoration-1 flex items-center gap-1">
              {price.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="currency"
                className="w-4.5 h-4.5"
              />
            </p>
          </div>
        </div>

        {/* Quantity Section - Centered */}
        <div className="col-span-3 flex justify-center">
          <div className="flex items-center justify-center gap-6 w-[152px]">
            <QuantityControls />
          </div>
        </div>

        {/* Total Section */}
        <div className="col-span-3 text-right pr-2">
          <p className="text-[#003D3B] font-bold text-xl flex items-center justify-end gap-1">
            {total.toFixed(2)}
            <img
              src="/images/c_currency.png"
              alt="c_currency"
              className="w-4.5 h-4.5"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
