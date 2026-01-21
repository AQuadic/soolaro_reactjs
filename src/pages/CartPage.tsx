import React from "react";
import BreadCrumbs from "../components/general/BreadCrumbs";
import EmptyCart from "../components/cart/EmptyCart";
import CartListing from "../components/cart/CartListing";

const CartPage = () => {
  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Best Seller", nameAr: "الأكثر مبيعاً", Link: "/explore" },
    { nameEn: "Liwa Details", nameAr: "تفاصيل ليوا", Link: "/product/liwa" },
    { nameEn: "Cart", nameAr: "السلة" },
  ];

  // Set to false to show the populated state
  const isEmpty = false;

  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />
      <div className="container py-6 md:py-10">
        {isEmpty ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#0B0B0B]">
              Your Cart
            </h1>
            <div className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
              <EmptyCart />
            </div>
          </>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <CartListing />
            </div>
            {/* Sidebar / Checkout Summary will go here later */}
            <div className="w-full lg:w-[350px] shrink-0">
              {/* Placeholder for summary */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
                <h2 className="text-xl font-bold mb-4">Summary</h2>
                <p className="text-gray-500">Checkout summary coming next...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
