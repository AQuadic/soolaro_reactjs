import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "../icons/home/hero/SliderArrow";
import { Image } from "@/components/ui/image";
import { getSliders, type Slider } from "@/lib/api/home/slider";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

function HomeSlider() {
  const { i18n } = useTranslation();
  const { data: slides, isLoading, isError } = useQuery<Slider[]>({
    queryKey: ["sliders", i18n.language],
    queryFn: () => getSliders({ perPage: 10 }),
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex items-center justify-center gap-2 -bottom-10!">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="md:hidden w-2 h-2 rounded-full bg-gray-300 hover:bg-[#018884] transition-all duration-300 slick-dot-custom" />
    ),
  };

  if (isLoading) return <div className="flex items-center justify-center">
    <Loader />
  </div>
  if (isError || !slides || slides.length === 0)
    return <div className="text-center py-20">No sliders available.</div>;

  return (
    <div className="slider-container md:max-w-145 w-full mb-1">
      <style>{`
        .slick-dots li.slick-active .slick-dot-custom {
          width: 20px !important;
          background-color: #018884 !important;
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
        .slick-slide:not(.slick-current) .slider-overlay {
           opacity: 1;
        }
        .slider-overlay {
           opacity: 0;
           transition: opacity 0.5s ease;
        }
      `}</style>


      <SliderSlick {...settings}>
        {slides.map((slide) => {
          const slideImage = i18n.language === "ar" ? slide.ar_image.url : slide.en_image.url;
          const slideTitle = slide.title ?? slide.name;
          const slideButton = slide.text_button ?? slide.name;

          return (
            <div className="slider-card relative mx-2 group">
            <div className="relative md:w-[275px] w-[206px] md:h-[360px] h-[240px] rounded-4xl overflow-hidden">
              <Image
                src={slideImage}
                alt={slideTitle}
                wrapperClassName="md:w-[275px] w-[206px] md:h-[360px] h-[240px] rounded-4xl"
                className="w-full h-full object-cover"
              />
              <div className="slider-overlay absolute inset-0 bg-black/50 z-10 pointer-events-none" />
            </div>
            <div className="absolute md:w-68.75 w-[206px] h-10 bg-[#FFFFFF33] bottom-0 backdrop-blur-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-20">
              <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium">
                {slideTitle}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">
                  {slideButton}
                </p>
                <SliderArrow />
              </div>
            </div>
          </div>
        )})}
      </SliderSlick>
    </div>
  );
}

export default HomeSlider;
