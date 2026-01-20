import Arrow from "../icons/home/hero/Arrow";
import HomeSlider from "./HomeSlider";

const HomeHero = () => {
    return (
        <section className="h-screen bg-[linear-gradient(180deg,#A8D4D3_0%,#D1E8E7_59.27%,#FEFEFE_100%)]">
            <div className="container flex lg:flex-row flex-col items-center justify-between gap-8 overflow-hidden">
                <div>
                    <h2 className="md:w-125 w-75 text-[#0B0B0B] md:text-[48px] text-2xl font-semibold leading-[150%]">
                        Premium <span className="text-[#003D3B]">Eyewear </span> for  Style and <span className="text-[#003D3B]">Comfort!</span>
                    </h2>

                    <p className="md:w-146 text-[#3B3B3B] md:text-xl text-xs font-medium leading-[150%] mt-3">
                        Explore a curated collection of glasses that combine modern design, superior quality, and everyday comfort. Find the perfect pair that suits your style and enhances your vision."
                    </p>

                    <button className="md:w-102.75 w-full md:h-14 h-12 rounded-[100px] bg-[#018884] mt-6 relative">
                        <p className="text-[#FEFEFE] md:text-lg text-base font-semibold">
                            Explore Shop
                        </p>
                        <div className="absolute md:-top-2 -top-1 md:-right-2 -right-1">
                            <Arrow />
                        </div>
                    </button>
                </div>

                <div className="flex-1 w-full">
                    <HomeSlider />
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
