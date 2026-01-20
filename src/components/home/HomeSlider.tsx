import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "../icons/home/hero/SliderArrow";

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        }
      }
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex items-center justify-center gap-2 -bottom-10!"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#00BCD4] transition-all duration-300 slick-dot-custom" />
    )
  };
  
  return (
    <div className="slider-container">
      <style>{`
        .slick-dots li.slick-active .slick-dot-custom {
          width: 40px !important;
          background-color: #00BCD4 !important;
        }
        .slick-dots li {
          margin: 0 !important;
          width: auto !important;
          height: auto !important;
        }
        .slick-dots li button {
          padding: 0 !important;
          width: auto !important;
          height: auto !important;
        }
        .slick-dots li button:before {
          display: none !important;
        }
      `}</style>
      
      <Slider {...settings}>
        <div className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl relative">
            <img 
                src="/images/home/slider1.png"
                alt="slider image"
                className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl object-cover"
            />
            <div className="absolute md:w-68.75 w-51.5 h-10 bg-[#FFFFFF33] bottom-0 blure-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4">
                <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">Abu Dhabi</p>
                <div className="flex items-center gap-2">
                    <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">Explore</p>
                    <SliderArrow />
                </div>
            </div>
        </div>

        <div className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl">
            <img 
                src="/images/home/slider2.jpg"
                alt="slider image"
                className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl object-cover"
            />
        </div>

        <div className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl">
            <img 
                src="/images/home/slider2.jpg"
                alt="slider image"
                className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl object-cover"
            />
        </div>

        <div className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl relative">
            <img 
                src="/images/home/slider1.png"
                alt="slider image"
                className="md:w-68.75 w-51.5 md:h-101.5 h-71.75 rounded-4xl object-cover"
            />
            <div className="absolute md:w-68.75 w-51.5 h-10 bg-[#FFFFFF33] bottom-0 blure-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4">
                <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">Abu Dhabi</p>
                <div className="flex items-center gap-2">
                    <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">Explore</p>
                    <SliderArrow />
                </div>
            </div>
        </div>
      </Slider>
    </div>
  );
}

export default HomeSlider;