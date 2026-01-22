import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EmptyCartIcon from "../icons/cart/EmptyCartIcon";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center px-4">
      <div className="w-48 h-48 md:w-64 md:h-64 mb-6 md:mb-8 animate-in fade-in zoom-in duration-500">
        <EmptyCartIcon className="w-full h-full" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[#0B0B0B] mb-3">
        Your Cart is Empty
      </h2>

      <p className="text-[#555555] text-base md:text-lg max-w-md mb-8 md:mb-10 leading-relaxed">
        Looks like you haven't added anything to your cart yet. Explore our
        collections and find something you love!
      </p>

      <Link
        to="/explore"
        className="group flex items-center gap-2 bg-[#018884] hover:bg-[#003D3B] text-white text-base md:text-lg font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Start Shopping
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default EmptyCart;
