import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { useTranslation } from "react-i18next";

interface SeeStyleProps {
  images: { url: string; file_name?: string }[];
}

const SeeStyle = ({ images }: SeeStyleProps) => {
  const { t } = useTranslation("product");

  if (!images || images.length === 0) return null;

  return (
    <section className="container mt-10">
      <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
        {t('see_style')}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="md:mt-12 mt-4"
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.url}
                alt={img.file_name || `style-${index + 1}`}
                className="md:w-[379px] w-[226px] md:h-[455px] h-[271px] rounded-4xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default SeeStyle;
