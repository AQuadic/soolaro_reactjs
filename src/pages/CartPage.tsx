import React from "react";

const CartPage = () => {
  return (
    <div className="container py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
      </div>
    </div>
  );
};

export default CartPage;
