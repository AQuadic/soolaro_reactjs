import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

const SeeStyle = () => {
  return (
    <section className="container">
      <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
        See Your Style in Action
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
          <SwiperSlide>
            <Image
              src="/images/product/style1.png"
              alt="style"
              className="md:w-[379px] w-[226px] md:h-[455px] h-[271px] rounded-4xl object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/product/style2.png"
              alt="style"
              className="md:w-[379px] w-[226px] md:h-[455px] h-[271px] rounded-4xl object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/product/style2.png"
              alt="style"
              className="md:w-[379px] w-[226px] md:h-[455px] h-[271px] rounded-4xl object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </section>
  );
};

export default SeeStyle;
