import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheckoutContactInfo } from "../components/checkout/CheckoutContactInfo";
import { CheckoutShippingAddress } from "../components/checkout/CheckoutShippingAddress";
import { CheckoutOrderSummary } from "../components/checkout/CheckoutOrderSummary";
import type { PhoneValue } from "../components/ui/PhoneInput";
import { useTranslation } from "react-i18next";
import { createCheckout } from "@/lib/api/checkout";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { t } = useTranslation("checkout");
  const navigate = useNavigate();
  const { appliedCoupon } = useCartStore();

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: {
      code: "AE",
      number: "",
      e164: "",
      countryCode: "AE",
      national: "",
    },
  });

  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    countryId: "",
    cityId: "",
    areaId: "",
    street: "",
    floorNo: "",
    apartmentNo: "",
    orderNote: "",
  });

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

  const handlePlaceOrder = async () => {
    // Validation
    const userName =
      `${contactInfo.firstName.trim()} ${contactInfo.lastName.trim()}`.trim();
    if (!userName) {
      toast.error(t("pleaseEnterName"));
      return;
    }
    if (!contactInfo.email) {
      toast.error(t("pleaseEnterEmail"));
      return;
    }
    if (!contactInfo.phone.number || !contactInfo.phone.number.trim()) {
      toast.error(t("pleaseEnterPhone"));
      return;
    }
    if (!shippingAddress.countryId) {
      toast.error(t("pleaseSelectCountry"));
      return;
    }
    if (!shippingAddress.cityId) {
      toast.error(t("pleaseSelectCity"));
      return;
    }
    if (!shippingAddress.street) {
      toast.error(t("pleaseEnterStreet"));
      return;
    }

    setIsProcessing(true);

    try {
      // Build address details from form fields
      const addressDetails = [
        shippingAddress.street,
        shippingAddress.floorNo && `Floor: ${shippingAddress.floorNo}`,
        shippingAddress.apartmentNo &&
          `Apartment: ${shippingAddress.apartmentNo}`,
      ]
        .filter(Boolean)
        .join(", ");

      const checkoutData = {
        payment_method: "stripe",
        user_name: userName,
        email: contactInfo.email,
        phone: contactInfo.phone.number,
        phone_country: contactInfo.phone.code,
        country_id: shippingAddress.countryId,
        city_id: shippingAddress.cityId,
        area_id: shippingAddress.areaId || undefined,
        details:
          addressDetails +
          (shippingAddress.orderNote
            ? ` - Note: ${shippingAddress.orderNote}`
            : ""),
        coupon_code: appliedCoupon || undefined,
      };

      const response = await createCheckout(checkoutData);

      toast.success(response.message || t("orderPlacedSuccess"));

      // If there's a payment URL, redirect to it
      const paymentUrl =
        response.data?.payment_url || (response as any).payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        // Otherwise navigate to order confirmation or home
        navigate("/");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.dismiss()
      toast.error(
        error.response?.data?.message || error.message || t("orderPlacedError"),
      );
    } finally {
      setIsProcessing(false);
    }
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
                    className="md:hidden w-full h-14 bg-[#018884] text-white text-lg font-bold rounded-4xl hover:bg-[#006F6C]  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? t("processing") : t("payNow")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <CheckoutOrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
