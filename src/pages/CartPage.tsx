import React from "react";
import BreadCrumbs from "../components/general/BreadCrumbs";
import EmptyCart from "../components/cart/EmptyCart";

const CartPage = () => {
  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Best Seller", nameAr: "الأكثر مبيعاً", Link: "/explore" },
    { nameEn: "Liwa Details", nameAr: "تفاصيل ليوا", Link: "/product/liwa" },
    { nameEn: "Cart", nameAr: "السلة" },
  ];

  // Mock empty state for now
  const isEmpty = true;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />
      <div className="container py-6 md:py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#0B0B0B]">
          Your Cart
        </h1>

        {isEmpty ? (
          <div className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
            <EmptyCart />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Cart Items will go here */}
            <p className="text-gray-500 text-lg">
              Cart items list component placeholder
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
