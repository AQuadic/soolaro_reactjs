import { useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginRequiredPopup from "./LoginRequiredPopup";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

interface CartSummaryProps {
  disablePopup?: boolean;
}

const CartSummary = ({ disablePopup = false }: CartSummaryProps) => {
  const { t } = useTranslation("cart");
  const navigate = useNavigate();
  const { cart, appliedCoupon, isCouponLoading, applyCoupon, clearCoupon } =
    useCartStore();
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated());

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

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      await applyCoupon(couponCode.trim());
      setCouponStatus("success");
      toast.success(t("couponSuccess", "Coupon applied successfully"));
    } catch {
      setCouponStatus("error");
      toast.error(t("couponError", "Invalid coupon code"));
    }
  };

  const handleClearCoupon = async () => {
    try {
      await clearCoupon();
      setCouponCode("");
      setCouponStatus("idle");
      toast.success(t("couponCleared", "Coupon removed"));
    } catch {
      toast.error(t("couponClearError", "Failed to remove coupon"));
    }
  };

  return (
    <div className="w-full lg:w-[363px] p-6 rounded-[24px] border border-[#DEDDDD]">
      <h2 className="text-[28px] font-medium text-[#0B0B0B] mb-6">
        {t("orderSummary")}
      </h2>

      <div className="mb-8">
        <label className="block text-[#0B0B0B] text-lg font-medium mb-3">
          {t("haveCoupon")}
        </label>

        <div className="relative flex items-stretch h-[56px] w-full">
          <div
            className={`relative flex-1 bg-white border ltr:border-r-0 rtl:border-l-0 ltr:rounded-l-lg rtl:rounded-r-lg transition-colors overflow-hidden ${
              couponStatus === "error"
                ? "border-[#C30000]"
                : couponStatus === "success"
                  ? "border-[#2A6F02]"
                  : "border-[#EAEAEA]"
            }`}
          >
            <input
              type="text"
              placeholder={t("enterCoupon")}
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                if (couponStatus !== "idle") setCouponStatus("idle");
              }}
              className={`w-full h-full px-4 text-base focus:outline-none placeholder:text-[#8E8E8E] ${
                couponStatus === "success"
                  ? "text-[#2A6F02]"
                  : couponStatus === "error"
                    ? "text-[#C30000]"
                    : "text-[#0B0B0B]"
              }`}
            />
          </div>

          <button
            onClick={
              couponStatus === "success" ? handleClearCoupon : handleApplyCoupon
            }
            disabled={isCouponLoading}
            className={`px-8 font-semibold text-lg transition-colors ltr:rounded-r-lg rtl:rounded-l-lg h-full border-t border-r border-b disabled:opacity-50 ${
              couponStatus === "success"
                ? "bg-[#2A6F02] text-white border-[#2A6F02]"
                : couponStatus === "error"
                  ? "bg-[#F4E6E6] text-[#C30000] border-[#C30000]"
                  : "bg-[#EDEDED] text-[#3B3B3B] border-[#EAEAEA]"
            }`}
          >
            {isCouponLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : couponStatus === "success" ? (
              t("clear")
            ) : (
              t("apply")
            )}
          </button>
        </div>

        {couponStatus === "success" && (
          <div className="flex items-center gap-2 mt-2 text-[#2A6F02]">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">{t("couponSuccess")}</span>
          </div>
        )}

        {couponStatus === "error" && (
          <div className="flex items-center gap-2 mt-2 text-[#C30000]">
            <XCircle className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">{t("couponError")}</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
          <span>{t("subTotal")}:</span>
          <span className="flex items-center gap-1">
            {subtotal.toFixed(2)}
            <img
              src="/images/currency.png"
              alt="c_currency"
              className="w-4.5 h-4.5"
            />
          </span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
            <span>{t("shippingCost")}:</span>
            <span className="flex items-center gap-1">
              {shipping.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="c_currency"
                className="w-4.5 h-4.5"
              />
            </span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
            <span>{t("tax")}:</span>
            <span className="flex items-center gap-1">
              {tax.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="c_currency"
                className="w-4.5 h-4.5"
              />
            </span>
          </div>
        )}
        {totalDiscount > 0 && (
          <div className="flex justify-between items-center text-[#2A6F02] text-lg font-medium">
            <span>{t("discount")}:</span>
            <span className="flex items-center gap-1">
              -{totalDiscount.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="c_currency"
                className="w-4.5 h-4.5"
              />
            </span>
          </div>
        )}
      </div>

      <div className="w-full h-[1px] bg-[#EAEAEA] mb-6"></div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-[#0B0B0B] text-xl font-medium">
          {t("total")}:
        </span>
        <span className="text-[#005B58] text-2xl font-bold flex items-center gap-1">
          {total.toFixed(2)}
          <img
            src="/images/currency.png"
            alt="c_currency"
            className="w-4.5 h-4.5"
          />
        </span>
      </div>

      {disablePopup || isLoggedIn ? (
        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-[#018884] hover:bg-[#006F6C] text-white md:text-xl text-base md:font-bold font-semibold md:py-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
        >
          {t("checkout")}
        </button>
      ) : (
        <LoginRequiredPopup
          isLoggedIn={isLoggedIn}
          onProceed={() => navigate("/checkout")}
        >
          <button className="w-full bg-[#018884] hover:bg-[#006F6C] text-white md:text-xl text-base md:font-bold font-semibold md:py-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer">
            {t("checkout")}
          </button>
        </LoginRequiredPopup>
      )}
    </div>
  );
};

export default CartSummary;
