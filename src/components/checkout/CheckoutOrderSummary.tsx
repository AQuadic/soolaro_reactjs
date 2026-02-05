import { CheckoutProductItem } from "./CheckoutProductItem";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export const CheckoutOrderSummary = () => {
  const { t } = useTranslation(["checkout", "cart"]);
  const { cart, appliedCoupon, isCouponLoading, applyCoupon, clearCoupon } =
    useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<
    "idle" | "success" | "error"
  >(appliedCoupon ? "success" : "idle");

  const calculations = cart?.calculations;
  const subtotal = calculations?.subtotal || 0;
  const shipping = calculations?.delivery_fees || 0;
  const tax = calculations?.tax || 0;
  const totalDiscount = calculations?.total_discount || 0;
  const total = calculations?.total || 0;
  const items = cart?.items || [];

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      await applyCoupon(couponCode.trim());
      setCouponStatus("success");
      toast.dismiss();
      toast.success(t("cart:couponSuccess"));
    } catch {
      setCouponStatus("error");
      toast.dismiss();
      toast.error(t("cart:couponError"));
    }
  };

  const handleClearCoupon = async () => {
    try {
      await clearCoupon();
      setCouponCode("");
      setCouponStatus("idle");
      toast.dismiss();
      toast.success(t("cart:couponCleared"));
    } catch {
      toast.dismiss();
      toast.error(t("cart:couponClearError"));
    }
  };

  return (
    <div className="w-full lg:w-[379px] bg-[#F5FAFA] rounded-4xl p-4 md:p-8 lg:sticky lg:top-4">
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Order Summary Title */}
        <h2 className="text-[#0B0B0B] text-xl md:text-2xl font-medium">
          {t("orderSummary")}
        </h2>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {/* Products List - Always visible at top */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CheckoutProductItem
                key={item.id}
                product={{
                  id: item.id.toString(),
                  name:
                    typeof item.name === "string"
                      ? item.name
                      : item.name.en || item.name.ar || "",
                  image:
                    typeof item.image === "string"
                      ? item.image
                      : item.image.url || "",
                  price: item.variant.final_price,
                  quantity: item.quantity,
                }}
              />
            ))}
          </div>

          {/* Coupon Code */}
          <div className="flex flex-col gap-4">
            <p className="text-[#0B0B0B] text-sm md:text-base font-medium">
              {t("haveCoupon")}
            </p>
            <div className="relative flex items-stretch h-12 md:h-14 w-full">
              <div
                className={`relative flex-1 bg-white border ltr:border-r-0 rtl:border-l-0 ltr:rounded-l-lg rtl:rounded-r-lg transition-colors overflow-hidden ${
                  couponStatus === "error"
                    ? "border-[#C30000]"
                    : couponStatus === "success"
                      ? "border-[#2A6F02]"
                      : "border-[#ECECEC]"
                }`}
              >
                <input
                  type="text"
                  placeholder={t("couponPlaceholder")}
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    if (couponStatus !== "idle") setCouponStatus("idle");
                  }}
                  className={`w-full h-full px-4 text-sm md:text-base focus:outline-none placeholder:text-[#8E8E8E] ${
                    couponStatus === "success"
                      ? "text-[#2A6F02]"
                      : couponStatus === "error"
                        ? "text-[#C30000]"
                        : "text-[#0B0B0B]"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={
                  couponStatus === "success"
                    ? handleClearCoupon
                    : handleApplyCoupon
                }
                disabled={isCouponLoading}
                className={`px-6 font-semibold text-sm md:text-lg transition-colors ltr:rounded-r-lg rtl:rounded-l-lg h-full border-t border-r border-b disabled:opacity-50 ${
                  couponStatus === "success"
                    ? "bg-[#2A6F02] text-white border-[#2A6F02]"
                    : couponStatus === "error"
                      ? "bg-[#F4E6E6] text-[#C30000] border-[#C30000]"
                      : "bg-[#ECECEC] text-[#3B3B3B] border-[#ECECEC]"
                }`}
              >
                {isCouponLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : couponStatus === "success" ? (
                  t("cart:clear")
                ) : (
                  t("apply")
                )}
              </button>
            </div>

            {couponStatus === "success" && (
              <div className="flex items-center gap-2 text-[#2A6F02]">
                <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">
                  {t("cart:couponSuccess")}
                </span>
              </div>
            )}

            {couponStatus === "error" && (
              <div className="flex items-center gap-2 text-[#C30000]">
                <XCircle className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">
                  {t("cart:couponError")}
                </span>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[#3B3B3B] text-xs md:text-base font-medium">
                  {t("subTotal")}:
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                    {subtotal.toFixed(2)}
                  </span>
                  <img
                    src="/images/currency.png"
                    alt="currency"
                    className="w-[18px] h-4"
                  />
                </div>
              </div>
              {shipping > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-[#3B3B3B] text-xs md:text-base font-medium">
                    {t("shippingCost")}:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                      {shipping.toFixed(2)}
                    </span>
                    <img
                      src="/images/currency.png"
                      alt="currency"
                      className="w-[18px] h-4"
                    />
                  </div>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-[#3B3B3B] text-xs md:text-base font-medium">
                    {t("cart:tax")}:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                      {tax.toFixed(2)}
                    </span>
                    <img
                      src="/images/currency.png"
                      alt="currency"
                      className="w-[18px] h-4"
                    />
                  </div>
                </div>
              )}
              {totalDiscount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-[#2A6F02] text-xs md:text-base font-medium">
                    {t("cart:discount")}:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#2A6F02] text-sm md:text-base font-medium">
                      -{totalDiscount.toFixed(2)}
                    </span>
                    <img
                      src="/images/currency.png"
                      alt="currency"
                      className="w-[18px] h-4"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#F6F6F6]" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                {t("total")}:
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[#025D5B] text-base md:text-xl font-semibold">
                  {total.toFixed(2)}
                </span>
                <img
                  src="/images/currency.png"
                  alt="currency"
                  className="w-5 h-[18px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
