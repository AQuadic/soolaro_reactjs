import { useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

const CartSummary = () => {
  const { t } = useTranslation("cart");
  const navigate = useNavigate();
  const { cart, appliedCoupon, isCouponLoading, applyCoupon, clearCoupon } =
    useCartStore();

  // Only tracks what the user is typing before hitting Apply.
  // The "applied" state is derived from the store's `appliedCoupon`.
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  // Derive display values from store truth — no useEffect sync required.
  // When appliedCoupon is cleared externally (e.g. after order completion),
  // the UI automatically reflects this.
  const isCouponApplied = Boolean(appliedCoupon);
  const inputDisplayValue = isCouponApplied
    ? (appliedCoupon ?? "")
    : couponInput;

  const calculations = cart?.calculations;
  const subtotal = calculations?.subtotal || 0;
  const shipping = calculations?.delivery_fees || 0;
  const tax = calculations?.tax || 0;
  const total = calculations?.total || 0;
  const couponDiscount = calculations?.discount || 0;
  const showDiscount = isCouponApplied && couponDiscount > 0;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponError(null);

    try {
      await applyCoupon(couponInput.trim());
      // On success, clear the local input — the display now uses the store value
      setCouponInput("");
      toast.dismiss();
      toast.success(t("couponSuccess"));
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      setCouponError(message ?? t("couponError"));
      toast.dismiss();
      toast.error(message ?? "");
    }
  };

  const handleClearCoupon = async () => {
    try {
      await clearCoupon();
      setCouponInput("");
      setCouponError(null);
      toast.dismiss();
      toast.success(t("couponCleared"));
    } catch {
      toast.dismiss();
      toast.error(t("couponClearError"));
    }
  };

  const borderColor = couponError
    ? "border-[#C30000]"
    : isCouponApplied
      ? "border-[#2A6F02]"
      : "border-[#EAEAEA]";

  const textColor = isCouponApplied
    ? "text-[#2A6F02]"
    : couponError
      ? "text-[#C30000]"
      : "text-[#0B0B0B]";

  const buttonStyle = isCouponApplied
    ? "bg-[#2A6F02] text-white border-[#2A6F02]"
    : couponError
      ? "bg-[#F4E6E6] text-[#C30000] border-[#C30000]"
      : "bg-[#EDEDED] text-[#3B3B3B] border-[#EAEAEA]";

  return (
    <div className="w-full lg:w-90.75 p-6 rounded-[24px] border border-[#DEDDDD]">
      <h2 className="text-[28px] font-medium text-[#0B0B0B] mb-6">
        {t("orderSummary")}
      </h2>

      <div className="mb-8">
        <label className="block text-[#0B0B0B] text-lg font-medium mb-3">
          {t("haveCoupon")}
        </label>

        <div className="relative flex items-stretch h-14 w-full">
          <div
            className={`relative flex-1 bg-white border ltr:border-r-0 rtl:border-l-0 ltr:rounded-l-lg rtl:rounded-r-lg transition-colors overflow-hidden ${borderColor}`}
          >
            <input
              type="text"
              placeholder={t("enterCoupon")}
              value={inputDisplayValue}
              disabled={isCouponApplied}
              onChange={(e) => {
                setCouponInput(e.target.value);
                // Clear any error as user types
                if (couponError) setCouponError(null);
              }}
              className={`w-full h-full px-4 text-base focus:outline-none placeholder:text-[#8E8E8E] disabled:bg-[#F9F9F9] disabled:cursor-not-allowed ${textColor}`}
            />
          </div>

          <button
            onClick={isCouponApplied ? handleClearCoupon : handleApplyCoupon}
            disabled={isCouponLoading}
            className={`px-8 font-semibold text-lg transition-colors ltr:rounded-r-lg rtl:rounded-l-lg h-full border-t border-r border-b disabled:opacity-50 ${buttonStyle}`}
          >
            {isCouponLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isCouponApplied ? (
              t("clear")
            ) : (
              t("apply")
            )}
          </button>
        </div>

        {isCouponApplied && (
          <div className="flex items-center gap-2 mt-2 text-[#2A6F02]">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">{t("couponSuccess")}</span>
          </div>
        )}

        {couponError && !isCouponApplied && (
          <div className="flex items-center gap-2 mt-2 text-[#C30000]">
            <XCircle className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">{couponError}</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
          <span>{t("subTotal")}:</span>
          <span className="flex items-center gap-0.5">
            {subtotal.toFixed(2)}
            <img
              src="/images/currency.png"
              alt="c_currency"
              className="w-[18px] h-[18px]"
            />
          </span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
            <span>{t("shippingCost")}:</span>
            <span className="flex items-center gap-0.5">
              {shipping.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="c_currency"
                className="w-[18px] h-[18px]"
              />
            </span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
            <span>{t("tax")}:</span>
            <span className="flex items-center gap-0.5">
              {tax.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="c_currency"
                className="w-[18px] h-[18px]"
              />
            </span>
          </div>
        )}
        {showDiscount && (
          <div className="flex justify-between items-center text-[#2A6F02] text-lg font-medium">
            <span>{t("discount")}:</span>
            <span className="flex items-center gap-0.5">
              -{couponDiscount.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="c_currency"
                className="w-[18px] h-[18px]"
              />
            </span>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-[#EAEAEA] mb-6"></div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-[#0B0B0B] text-xl font-medium">
          {t("total")}:
        </span>
        <span className="text-[#005B58] text-2xl font-bold flex items-center gap-0.5">
          {total.toFixed(2)}
          <img
            src="/images/currency.png"
            alt="c_currency"
            className="w-[18px] h-[18px]"
          />
        </span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-[#018884] hover:bg-[#006F6C] text-white md:text-xl text-base md:font-bold font-semibold md:py-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
      >
        {t("checkout")}
      </button>
    </div>
  );
};

export default CartSummary;
