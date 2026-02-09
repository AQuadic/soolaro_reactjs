import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "../icons/home/hero/SliderArrow";
import { Image } from "@/components/ui/image";
import { getSliders, type Slider } from "@/lib/api/home/slider";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function HomeSlider() {
  const { t, i18n } = useTranslation("home");
  const {
    data: slides,
    isLoading,
    isError,
  } = useQuery<Slider[]>({
    queryKey: ["sliders", i18n.language],
    queryFn: () => getSliders(),
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    rtl: i18n.language === "ar",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
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

  if (isLoading)
    return (
      <div className="slider-container md:max-w-145 w-full mb-1 flex gap-4 overflow-hidden">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="md:w-1/2 w-[70vw] shrink-0 md:h-[360px] h-[240px] rounded-4xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );

  if (isError || !slides || slides.length === 0)
    return <div className="text-center py-20">{t("no_sliders")}</div>;

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
        .slick-slide:not(.slick-current) .slider-overlay {
           opacity: 1;
        }
        .slider-overlay {
           opacity: 0;
           transition: opacity 0.5s ease;
        }
        /* Custom spacing for slides */
        .slick-slide {
          padding: 0 4px; /* Creates gap between slides */
        }
        /* Fix for desktop layout overflow */
        .slick-list {
          margin: 0 -4px;
        }
      `}</style>

      <SliderSlick {...settings}>
        {slides.map((slide, index) => {
          const slideImage =
            i18n.language === "ar" ? slide.ar_image : slide.en_image;
          const slideTitle = slide.title ?? slide.name;
          const slideButton = slide.text_button ?? slide.name;

          return (
            <div
              key={index}
              className="slider-card relative group outline-none"
            >
              <div className="relative w-full md:h-[360px] h-[240px] rounded-4xl overflow-hidden">
                <Image
                  apiImage={slideImage}
                  preferredSize="medium"
                  alt={slideTitle}
                  wrapperClassName="w-full h-full rounded-4xl"
                  className="w-full h-full object-cover"
                />
                <div className="slider-overlay absolute inset-0 bg-black/50 z-10 pointer-events-none" />
              </div>
              <a
                href={slide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-full h-10 bg-[#FFFFFF33] bottom-0 backdrop-blur-[20px] rounded-bl-4xl rounded-br-4xl flex items-center justify-between px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-20"
              >
                <p className="text-[#FFFFFF] md:text-xs text-[10px] font-medium truncate max-w-[70%]">
                  {slideTitle}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <p className="text-[#FFFFFF] md:text-sm text-xs font-medium">
                    {slideButton}
                  </p>
                  <SliderArrow />
                </div>
              </a>
            </div>
          );
        })}
      </SliderSlick>
    </div>
  );
}

export default HomeSlider;
