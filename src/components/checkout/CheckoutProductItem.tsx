// import { DirhamIcon } from "../icons/checkout/DirhamIcon";
import { Image } from "@/components/ui/image";

interface CheckoutProductItemProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
}

export const CheckoutProductItem = ({ product }: CheckoutProductItemProps) => {
  return (
    <div className="relative flex items-center gap-4 p-2 border border-[#ECECEC] rounded-[4px]">
      {/* Quantity Badge */}
      <div className="absolute -top-2 -left-2 w-4 h-4 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center border border-[#ECECEC]">
        <span className="text-[#018884] text-[8px] md:text-xs font-medium">
          {product.quantity}
        </span>
      </div>

      {/* Product Image */}
      <div className="w-16 h-16 md:w-[84px] md:h-[84px] bg-[#F6F6F6] rounded-[4px] md:rounded-[8px] flex-shrink-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <h3 className="text-[#0B0B0B] text-xs md:text-lg font-medium">
          {product.name}
        </h3>
        <div className="flex items-center gap-0.5">
          <span className="text-[#025D5B] text-sm md:text-xl font-semibold">
            {product.price.toFixed(2)}
          </span>
          <img
            src="/images/currency.png"
            alt="c_currency"
            className="w-4.5 h-4.5"
          />
        </div>
      </div>
    </div>
  );
};
