import { CheckoutProductItem } from "./CheckoutProductItem";
import { DirhamIcon } from "../icons/checkout/DirhamIcon";
import { useState } from "react";

interface CheckoutOrderSummaryProps {
  products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shippingCost: number;
  onPlaceOrder: () => void;
  isProcessing?: boolean;
}

export const CheckoutOrderSummary = ({
  products,
  subtotal,
  shippingCost,
  onPlaceOrder,
  isProcessing = false,
}: CheckoutOrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState("");

  const total = subtotal + shippingCost;

  const handleApplyCoupon = () => {
    // Simple validation - replace with actual coupon validation logic
    if (couponCode.trim().length > 0) {
      console.log("Applying coupon:", couponCode);
      // Add coupon application logic here
    }
  };

  return (
    <div className="w-full lg:w-[379px] bg-[#F5FAFA] rounded-4xl p-4 md:p-8 lg:sticky lg:top-4">
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Order Summary Title */}
        <h2 className="text-[#0B0B0B] text-xl md:text-2xl font-medium">
          Order Summary
        </h2>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {/* Products List - Always visible at top */}
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <CheckoutProductItem key={product.id} product={product} />
            ))}
          </div>

          {/* Coupon Code */}
          <div className="flex flex-col gap-4">
            <p className="text-[#0B0B0B] text-sm md:text-base font-medium">
              Have a coupon ?
            </p>
            <div className="relative">
              <input
                type="text"
                className="w-full h-12 md:h-14 border border-[#ECECEC] rounded-4xl px-4 pr-28 text-sm md:text-base focus:outline-none focus:border-[#018884]"
                placeholder="Enter Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="absolute right-0 top-0 h-12 md:h-14 px-6 bg-[#ECECEC] text-[#3B3B3B] text-sm md:text-lg font-bold rounded-4xl hover:bg-[#DEDDDD] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[#3B3B3B] text-xs md:text-base font-medium">
                  Sub Total:
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                    {subtotal.toFixed(2)}
                  </span>
                  <DirhamIcon className="w-3.5 h-3 md:w-[18px] md:h-4" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3B3B3B] text-xs md:text-base font-medium">
                  Shipping Cost:
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                    {shippingCost.toFixed(2)}
                  </span>
                  <DirhamIcon className="w-3.5 h-3 md:w-[18px] md:h-4" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#F6F6F6]" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-[#0B0B0B] text-sm md:text-base font-medium">
                Total:
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[#025D5B] text-base md:text-xl font-semibold">
                  {total.toFixed(2)}
                </span>
                <DirhamIcon className="w-4 h-3.5 md:w-[22.5px] md:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button - Mobile Fixed at Bottom */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isProcessing}
        className="fixed md:hidden bottom-0 left-0 right-0 w-full h-14 bg-[#018884] text-white text-lg font-bold hover:bg-[#006F6C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};
