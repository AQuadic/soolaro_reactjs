import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Card from "./GlassCard";
import { motion } from "framer-motion";

const NewArrival = () => {
  return (
    <section className="container pb-17">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center justify-between"
      >
        <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
          New Arrival
        </h2>
        <Link
          to="/"
          className="text-[#003D3B] md:text-lg text-xs font-semibold"
        >
          See All
        </Link>
      </motion.div>

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
          slidesPerView={1.25}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <Card image="/images/home/glass1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Card image="/images/home/glass2.png" priceColor="#003D3B" />
          </SwiperSlide>
          <SwiperSlide>
            <Card image="/images/home/glass3.png" />
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </section>
  );
};

export default NewArrival;
