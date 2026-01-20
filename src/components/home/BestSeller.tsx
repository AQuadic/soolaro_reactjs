import { Link } from "react-router-dom"
import Slider from "react-slick"
import Card from "./GlassCard"

const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 1.25,
        },
        },
    ],
}

const BestSeller = () => {
    return (
        <section className="container md:py-17 py-10">
        <div className="flex items-center justify-between">
            <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
            Best Seller
            </h2>
            <Link
            to="/"
            className="text-[#003D3B] md:text-lg text-xs font-semibold"
            >
            See All
            </Link>
        </div>

        <div className="md:mt-12 mt-4">
            <Slider {...sliderSettings}>
            <Card image="/images/home/glass2.png" />
            <Card image="/images/home/glass3.png" priceColor="#003D3B" />
            <Card image="/images/home/glass1.png" />
            </Slider>
        </div>
        </section>
    )
}

export default BestSeller
