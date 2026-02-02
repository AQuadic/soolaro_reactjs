import { useState } from "react";
import { Image } from "@/components/ui/image";
import BreadCrumbs from "../general/BreadCrumbs";
import Heart from "../icons/product/Heart";
import MobileHeart from "../icons/product/MobileHeart";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MobileBackHeader from "../general/MobileBackHeader";
import Plus from "../icons/product/Plus";
import Minus from "../icons/product/Minus";
import type { Product } from "@/lib/api/products/products";

interface ProductDetailsHeaderProps {
  product: Product;
}

const ProductDetailsHeader = ({ product }: ProductDetailsHeaderProps) => {
  const { t, i18n } = useTranslation("product");
  const [selectedImage, setSelectedImage] = useState(0);

  const breadcrumbItems = [
    { nameEn: "Home", nameAr: "الرئيسية", Link: "/" },
    { nameEn: "Best Seller", nameAr: "الأكثر مبيعاً", Link: "/explore" },
    { nameEn: product.name.en, nameAr: product.name.ar, Link: `/product_details/${product.id}` },
  ];

  const productImages = product.images.map(img => img.url);

  return (
    <section className="w-full md:max-w-[1280px] md:mx-auto px-0 md:px-4">
      <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />
      
      <Link to='/' className="md:hidden flex items-center gap-3 px-4">
        <MobileBackHeader />
        <p className="text-[#0B0B0B] text-base font-semibold mb-6">
          {i18n.language === "ar" ? product.name.ar : product.name.en}
        </p>
      </Link>
      <div className="md:my-10 flex flex-wrap items-center gap-8">
        <div className="md:w-146 w-full md:h-130.75 h-93.75 bg-[#F6F6F6] md:rounded-[24px] flex flex-col items-center justify-around relative">
          <Image
            src={productImages[selectedImage]}
            alt={i18n.language === "ar" ? product.name.ar : product.name.en}
            className="w-full h-full object-cover"
          />

          <div className="md:hidden block absolute top-3 right-3">
            <MobileHeart />
          </div>
          <div className="flex items-center md:gap-6 gap-4 py-6">
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`md:w-[133px] w-[73px] md:h-[133px] h-[73px] rounded-xl flex items-center justify-center cursor-pointer transition-colors relative ${
                  selectedImage === index ? "bg-[#F1F8F8]" : "bg-[#F6F6F6]"
                }`}
              >
                <Image src={img} alt={product.name.en} />
                {selectedImage === index && (
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-[#018884] rounded-b-xl"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="md:px-0 px-4">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-1 md:flex-col flex-row md:items-start items-center justify-between">
              <h2 className="text-[#000000] md:text-2xl text-base font-semibold">
                {i18n.language === "ar" ? product.name.ar : product.name.en}
              </h2>
              <p className="text-[#025D5B] md:text-[32px] text-xl font-medium leading-[100%] md:mt-6">
                {product.variants[0].final_price.toFixed(2)}
              </p>
            </div>
            <div className="md:block hidden">
              <Heart />
            </div>
          </div>

          <div className="md:mt-6 mt-4 flex items-center gap-6">
            <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
              Frame : <span className="text-[#3B3B3B] text-sm">Black</span>
            </p>
            <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
              Lenses : <span className="text-[#3B3B3B] text-sm">Black</span>
            </p>
          </div>

          <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-8 mt-6 text-[#FEFEFE] md:text-lg text-base md:font-bold font-semibold">
            {t('add_to_cart')}
          </button>

          <div className="w-full h-14 border border-[#018884] rounded-4xl mt-4 flex items-center justify-center gap-14.5">
            <button className="text-2xl hover:bg-[#0188841A] w-10 h-10 rounded-full hover:text-[#018884] flex items-center justify-center">
              <Minus />
            </button>
            <p className="text-[#025D5B] text-2xl font-medium">1</p>
            <button className="text-2xl hover:bg-[#0188841A] w-10 h-10 rounded-full hover:text-[#018884] flex items-center justify-center">
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsHeader;
