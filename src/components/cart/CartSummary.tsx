import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
}

const CartSummary = ({ subtotal, shipping }: CartSummaryProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const total = subtotal + shipping;

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    // Simulate coupon validation
    if (couponCode.toUpperCase() === "A12345") {
      setCouponStatus("success");
    } else {
      setCouponStatus("error");
    }
  };

  return (
    <div className="w-full lg:w-[363px] bg-white p-6 rounded-[24px] border border-[#EAEAEA] shadow-sm">
      <h2 className="text-[28px] font-medium text-[#0B0B0B] mb-6">
        Order Summary
      </h2>

      <div className="mb-8">
        <label className="block text-[#0B0B0B] text-lg font-medium mb-3">
          Have a coupon ?
        </label>

        <div className="relative flex items-stretch h-[56px] w-full">
          {/* Input Container */}
          <div
            className={`relative flex-1 bg-white border border-r-0 rounded-l-lg transition-colors overflow-hidden ${
              couponStatus === "error"
                ? "border-[#C30000]"
                : couponStatus === "success"
                  ? "border-[#2A6F02]"
                  : "border-[#EAEAEA]"
            }`}
          >
            <input
              type="text"
              placeholder="Enter Coupon"
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

          {/* Button */}
          <button
            onClick={handleApplyCoupon}
            className={`px-8 font-semibold text-lg transition-colors rounded-r-lg h-full border-t border-r border-b ${
              couponStatus === "success"
                ? "bg-[#2A6F02] text-white border-[#2A6F02]"
                : couponStatus === "error"
                  ? "bg-[#F4E6E6] text-[#C30000] border-[#C30000]"
                  : "bg-[#EDEDED] text-[#3B3B3B] border-[#EAEAEA]"
            }`}
          >
            {couponStatus === "success" ? "Applied" : "Apply"}
          </button>
        </div>

        {/* Status Messages */}
        {couponStatus === "success" && (
          <div className="flex items-center gap-2 mt-2 text-[#2A6F02]">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">
              Coupon applied successfully
            </span>
          </div>
        )}

        {couponStatus === "error" && (
          <div className="flex items-center gap-2 mt-2 text-[#C30000]">
            <XCircle className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">Invalid coupon code</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
          <span>Sub Total:</span>
          <span>AED {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-[#0B0B0B] text-lg font-medium">
          <span>Shipping Cost:</span>
          <span>AED {shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#EAEAEA] mb-6"></div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-[#0B0B0B] text-xl font-medium">Total:</span>
        <span className="text-[#005B58] text-2xl font-bold">
          AED {total.toFixed(2)}
        </span>
      </div>

      <button className="w-full bg-[#018884] hover:bg-[#006F6C] text-white text-xl font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        Check Out
      </button>
    </div>
  );
};

export default CartSummary;
