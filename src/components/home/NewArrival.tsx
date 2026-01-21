import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Card from "./GlassCard"
import 'swiper/css'

const NewArrival = () => {
    return (
        <section className="container pb-17">
            <div className="flex items-center justify-between">
                <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
                    New Arrival
                </h2>
                <Link
                    to="/"
                    className="text-[#003D3B] md:text-lg text-xs font-semibold"
                >
                    See All
                </Link>
            </div>

            <div className="md:mt-12 mt-4">
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
            </div>
        </section>
    )
}

export default NewArrival