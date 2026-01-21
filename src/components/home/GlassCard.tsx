import { useState } from "react";
import { motion } from "framer-motion";

type CardProps = {
  image: string;
  priceColor?: string;
};

const Card = ({ image, priceColor = "#0B0B0B" }: CardProps) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const colors = [
    "bg-[linear-gradient(135deg,#754B37_50%,#E98900_50%)]",
    "bg-[linear-gradient(135deg,#AE1111_50%,#232322_50%)]",
    "bg-[linear-gradient(135deg,#B7BFF9_50%,#0008E9_50%)]",
    "bg-[linear-gradient(135deg,#6A6A6A_50%,#0F0F0F_50%)]",
  ];
  return (
    <motion.div
      className="flex flex-col items-center justify-center cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="md:w-94.75 w-62.75 md:h-87.25 h-53.25 bg-[#F6F6F6] rounded-4xl flex items-center justify-center relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={image}
          alt="glass"
          className="w-88.75 h-44.25 object-cover z-10"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <h2 className="text-[#000000] md:text-xl text-xs font-medium mt-4">
        Liwa
      </h2>

      <h2
        className="md:text-2xl text-base font-medium leading-[100%] md:mt-4 mt-2"
        style={{ color: priceColor }}
      >
        AED 269.00
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
  );
};

export default Card;
