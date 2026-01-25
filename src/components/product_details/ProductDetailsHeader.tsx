import { useState } from "react";
import { Image } from "@/components/ui/image";
import BreadCrumbs from "../general/BreadCrumbs";
import Heart from "../icons/product/Heart";
import MobileHeart from "../icons/product/MobileHeart";

const ProductDetailsHeader = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Best Seller", nameAr: "الأكثر مبيعاً", Link: "/explore" },
    { nameEn: "Liwa", nameAr: "تفاصيل ليوا", Link: "/product/liwa" },
  ];

  const productImages = [
    "/images/home/glass_41.png",
    "/images/home/glass1.png",
    "/images/home/glass3.png",
    "/images/home/glass_43.png",
  ];

  return (
    <section className="container">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />

      <div className="md:my-10 flex flex-wrap items-center gap-8">
        <div className="md:w-146 w-full md:h-130.75 h-93.75 bg-[#F6F6F6] md:rounded-[24px] flex flex-col items-center justify-around relative">
          <Image
            src="/images/home/glass4.png"
            alt="glass"
            className="h- w-full mt-32"
          />

          <div className="md:hidden block absolute top-3 right-3">
            <MobileHeart />
          </div>
          <div className="flex items-center md:gap-6 gap-4 py-6">
            <div className="w-18.25 h-18.25 bg-[#FEFEFE] rounded-xl">
              <Image
                src="/images/home/glass_41.png"
                alt="glass"
                className="w-16.25 h-16.25"
              />
            </div>
            <div className="w-18.25 h-18.25 bg-[#FEFEFE] rounded-xl">
              <Image
                src="/images/home/glass_41.png"
                alt="glass"
                className="w-16.25 h-16.25"
              />
            </div>
            <div className="w-18.25 h-18.25 bg-[#FEFEFE] rounded-xl">
              <Image
                src="/images/home/glass_42.png"
                alt="glass"
                className="w-16.25 h-16.25"
              />
            </div>
            <div className="w-18.25 h-18.25 bg-[#FEFEFE] rounded-xl">
              <Image
                src="/images/home/glass_43.png"
                alt="glass"
                className="w-16.25 h-16.25"
              />
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-1 md:flex-col flex-row md:items-start items-center justify-between">
              <h2 className="text-[#000000] md:text-2xl text-base font-semibold">
                Liwa
              </h2>
              <p className="text-[#025D5B] md:text-[32px] text-xl font-medium leading-[100%] md:mt-6">
                269.00
              </p>
            </div>
            <div className="md:block hidden">
              <Heart />
            </div>
          </div>
          <div className="flex items-end md:gap-6 gap-4 md:mt-8 mt-6">
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`md:w-[133px] w-[73px] md:h-[133px] h-[73px] rounded-xl flex items-center justify-center cursor-pointer transition-colors relative ${
                  selectedImage === index ? "bg-[#F1F8F8]" : "bg-[#F6F6F6]"
                }`}
              >
                <Image src={img} alt="glass" />
                {selectedImage === index && (
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-[#018884] rounded-b-xl"></div>
                )}
              </div>
            ))}
          </div>

          <div className="md:mt-6 mt-4 flex items-center gap-6">
            <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
              Frame : <span className="text-[#3B3B3B] text-sm">Black</span>
            </p>

            <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
              Lenses : <span className="text-[#3B3B3B] text-sm">Black</span>
            </p>
          </div>

          <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-8 mt-6 text-[#FEFEFE] text-lg font-bold">
            Add To Cart
          </button>

          <div className="w-full h-14 border border-[#018884] rounded-4xl mt-4 flex items-center justify-center gap-14.5">
            <button className="text-2xl hover:bg-[#0188841A] w-10 h-10 rounded-full hover:text-[#018884]">
              -
            </button>
            <p className="text-2xl font-medium">1</p>
            <button className="text-2xl hover:bg-[#0188841A] w-10 h-10 rounded-full hover:text-[#018884]">
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsHeader;
