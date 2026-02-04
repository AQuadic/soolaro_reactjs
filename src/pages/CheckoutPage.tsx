import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheckoutContactInfo } from "../components/checkout/CheckoutContactInfo";
import { CheckoutShippingAddress } from "../components/checkout/CheckoutShippingAddress";
import { CheckoutOrderSummary } from "../components/checkout/CheckoutOrderSummary";
import type { PhoneValue } from "../components/ui/PhoneInput";
import { useTranslation } from "react-i18next";

const CheckoutPage = () => {
  const { t } = useTranslation("checkout");
  const navigate = useNavigate();

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: { code: "AE", number: "", e164: "", countryCode: "AE", national: "" },
  });

  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    emirate: "",
    area: "",
    street: "",
    floorNo: "",
    apartmentNo: "",
    orderNote: "",
  });

  // Mock product data - replace with actual cart data
  const mockProducts = [
    {
      id: "1",
      name: "Liwa-Black",
      image: "/images/home/glass1.png",
      price: 269.0,
      quantity: 1,
    },
  ];

  const subtotal = 269.0;
  const shippingCost = 25.0;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContactInfoChange = (
    field: string,
    value: string | PhoneValue,
  ) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingAddressChange = (field: string, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Add order placement logic here
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to order confirmation page
      // navigate("/order-confirmation");
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b border-[#F6F6F6]">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-[#F6F6F6] flex items-center justify-center"
          aria-label={t("goBack")}
        >
          <ChevronLeft className="w-6 h-6 text-[#0B0B0B]" />
        </button>
        <h1 className="text-[#0B0B0B] text-base font-semibold">
          {t("checkout")}
        </h1>
      </div>

      {/* Desktop Layout */}
      <div className="py-6 md:py-10">
        {/* Main Content */}
        <div className="container px-4 md:px-30 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Form Section */}
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-6 md:gap-10">
              {/* Delivery Information Section */}
              <div className="flex flex-col gap-6 md:gap-10">
                <h2 className="text-[#0B0B0B] text-lg md:text-[40px] font-semibold leading-none">
                  {t("deliveryInfo")}
                </h2>

                <div className="flex flex-col gap-6">
                  {/* Contact Info */}
                  <CheckoutContactInfo
                    formData={contactInfo}
                    onChange={handleContactInfoChange}
                  />

                  {/* Shipping Address */}
                  <CheckoutShippingAddress
                    formData={shippingAddress}
                    onChange={handleShippingAddressChange}
                  />

                  {/* Desktop Pay Now Button */}
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="hidden md:block w-full h-14 bg-[#018884] text-white text-lg font-bold rounded-4xl hover:bg-[#006F6C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? t("processing") : t("payNow")}
                  </button>

                  {/* Mobile Pay Now Button */}
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="md:hidden w-full h-14 bg-[#018884] text-white text-lg font-bold rounded-4xl hover:bg-[#006F6C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? t("processing") : t("payNow")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <CheckoutOrderSummary
            products={mockProducts}
            subtotal={subtotal}
            shippingCost={shippingCost}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
