import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Card from "../home/GlassCard";
import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/api/products/products";

export interface ProductItem {
  image: string;
  // price: number;
  priceColor?: string;
  height?: string;
  product?: Product;
}

interface ProductSliderProps {
  title: string;
  seeAllLink?: string;
  products: ProductItem[];
  containerClassName?: string;
}

const ProductSlider = ({
  title,
  seeAllLink,
  products,
  containerClassName = "container pb-17",
}: ProductSliderProps) => {
  const { t, i18n } = useTranslation("home");

  return (
    <section className={containerClassName}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center justify-between"
      >
        <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold leading-[100%]">
          {title}
        </h2>
        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-[#003D3B] md:text-lg text-xs font-semibold"
          >
            {t("see_all")}
          </Link>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="md:mt-12 mt-4"
      >
        <Swiper
          key={i18n.language}
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.25}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          breakpoints={{
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1025: {
              slidesPerView: 3,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Card
                image={product.image}
                priceColor={product.priceColor}
                height={product.height}
                product={product.product}
                showHeart={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default ProductSlider;
