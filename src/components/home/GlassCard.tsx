import { useState } from "react";
import { motion } from "framer-motion";
import FavHeart from "../icons/product/FavHeart";
import { Link } from "react-router-dom";

type CardProps = {
  image: string;
  priceColor?: string;
  width?: string;
  height?: string;
  showHeart?: boolean;
};

const Card = ({
  image,
  priceColor = "#0B0B0B",
  width = "w-88.75",
  height = "h-44.25",
  showHeart = false,
}: CardProps) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const colors = [
    "bg-[linear-gradient(135deg,#754B37_50%,#E98900_50%)]",
    "bg-[linear-gradient(135deg,#AE1111_50%,#232322_50%)]",
    "bg-[linear-gradient(135deg,#B7BFF9_50%,#0008E9_50%)]",
    "bg-[linear-gradient(135deg,#6A6A6A_50%,#0F0F0F_50%)]",
  ];
  return (
    <Link to='/product_details'>
      <motion.div
      className="flex flex-col items-center justify-center cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#F6F6F6] rounded-4xl flex items-center justify-center relative overflow-hidden">
        {showHeart && (
          <button className="absolute md:top-4 top-2 md:right-4 right-2 z-20">
            <FavHeart />
          </button>
        )}

        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={image}
          alt="glass"
          className={`${width} ${height} object-cover z-10`}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <h2 className="text-[#000000] md:text-xl text-xs font-medium mt-4">
        Liwa
      </h2>

      <h2
        className="md:text-2xl text-base font-medium leading-[100%] md:mt-4 mt-2 flex items-center gap-1"
        style={{ color: priceColor }}
      >
        269.00
        <img
            src="/images/currency.png"
            alt="c_currency"
            className="w-[27px] h-6"
          />
      </h2>

      <div className="md:mt-6 mt-3 flex gap-3">
        {colors.map((bg, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedColor(index)}
            className={`
              md:w-7 w-5 md:h-7 h-5 rounded-full ${bg}
              ${
                selectedColor === index
                  ? "border-[3px] border-[#0B0B0B]"
                  : "border-transparent"
              }
              transition
            `}
          />
        ))}
      </div>
    </motion.div>
    </Link>
  );
};

export default Card;
