import React from "react";
import BreadCrumbs from "../components/general/BreadCrumbs";

const CartPage = () => {
  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Best Seller", nameAr: "الأكثر مبيعاً", Link: "/explore" },
    { nameEn: "Liwa Details", nameAr: "تفاصيل ليوا", Link: "/product/liwa" },
    { nameEn: "Cart", nameAr: "السلة" },
  ];

  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />
      <div className="container py-10 md:py-20">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
