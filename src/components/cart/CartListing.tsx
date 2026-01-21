import React from "react";
import CartItem from "./CartItem";

const CartListing = () => {
  // Mock Data
  const items = [
    {
      id: 1,
      name: "Liwa-Black",
      price: 269.0,
      quantity: 1,
      image: "/images/home/glass1.png",
    },
    {
      id: 2,
      name: "Liwa-Orange",
      price: 269.0,
      quantity: 2,
      image: "/images/home/glass2.png",
    },
    {
      id: 3,
      name: "Liwa-Gold",
      price: 349.0,
      quantity: 1,
      image: "/images/home/glass3.png",
    },
  ];

  return (
    <div className="w-full">
      {/* Header Row - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center border-b border-[#EAEAEA] pb-4 mb-2">
        <div className="col-span-6 text-[#003D3B] font-bold text-lg pl-2">
          Product
        </div>
        <div className="col-span-3 text-[#0B0B0B] font-bold text-lg text-center flex justify-center">
          <span className="w-[152px] text-left">Quantity</span>
        </div>
        <div className="col-span-3 text-right text-[#0B0B0B] font-bold text-lg pr-2">
          Total
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col">
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CartListing;
