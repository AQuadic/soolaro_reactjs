import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Card from "../home/GlassCard";


const ComplateSelection = () => {
    return (
        <section className="container md:py-17 py-12">
            <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
                Complete your selection
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
                slidesPerView={1.25}
                breakpoints={{
                    768: {
                    slidesPerView: 3,
                    },
                }}
                >
                <SwiperSlide>
                    <Card image="/images/home/glass1.png" height="213"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Card image="/images/home/glass2.png" priceColor="#003D3B" height="213"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Card image="/images/home/glass3.png" height="213"/>
                </SwiperSlide>
                </Swiper>
            </motion.div>
        </section>
    )
}

export default ComplateSelection
