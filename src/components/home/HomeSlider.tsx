import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "../icons/home/hero/SliderArrow";

function HomeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex items-center justify-center gap-2 -bottom-10!">
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#00BCD4] transition-all duration-300 slick-dot-custom" />
    ),
  };

  return (
    <div className="slider-container md:max-w-[580px] w-full">
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
        .slick-list {
          height: 240px !important;
        }
        @media (min-width: 768px) {
          .slick-list {
            height: 360px !important;
          }
        }
      `}</style>

      <Slider {...settings}>
        <div className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl relative mx-2 group overflow-hidden">
          <img
            src="/images/home/slider1.png"
            alt="slider image"
            className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl object-cover"
          />
          <div className="absolute md:w-68.75 w-[206px] h-10 bg-[#FFFFFF33] bottom-0 backdrop-blur-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">
              Abu Dhabi
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">
                Explore
              </p>
              <SliderArrow />
            </div>
          </div>
        </div>

        <div className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl relative mx-2 group overflow-hidden">
          <img
            src="/images/home/slider2.jpg"
            alt="slider image"
            className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl object-cover"
          />
          <div className="absolute md:w-68.75 w-[206px] h-10 bg-[#FFFFFF33] bottom-0 backdrop-blur-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">
              Abu Dhabi
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">
                Explore
              </p>
              <SliderArrow />
            </div>
          </div>
        </div>

        <div className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl relative mx-2 group overflow-hidden">
          <img
            src="/images/home/slider2.jpg"
            alt="slider image"
            className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl object-cover"
          />
          <div className="absolute md:w-68.75 w-[206px] h-10 bg-[#FFFFFF33] bottom-0 backdrop-blur-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">
              Abu Dhabi
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">
                Explore
              </p>
              <SliderArrow />
            </div>
          </div>
        </div>

        <div className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl relative mx-2 group overflow-hidden">
          <img
            src="/images/home/slider1.png"
            alt="slider image"
            className="md:w-68.75 w-[206px] md:h-[360px] h-[240px] rounded-4xl object-cover"
          />
          <div className="absolute md:w-68.75 w-[206px] h-10 bg-[#FFFFFF33] bottom-0 backdrop-blur-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">
              Abu Dhabi
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">
                Explore
              </p>
              <SliderArrow />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default HomeSlider;
