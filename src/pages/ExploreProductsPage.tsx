import { useState } from "react";
import Card from "@/components/home/GlassCard";
import Filter from "@/components/icons/explore/Filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackArrow from "@/components/icons/explore/BackArrow";
import { Link } from "react-router-dom";
import Search from "@/components/icons/header/Search";
import { useTranslation } from "react-i18next";

const ExploreProductsPage = () => {
  const { t } = useTranslation("explore");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(900);
  const MIN = 100;
  const MAX = 1000;

  const handleMinChange = (value: number) => {
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (value: number) => {
    if (value >= minPrice) setMaxPrice(value);
  };

  const resetFilter = () => {
    setMinPrice(MIN);
    setMaxPrice(MAX);
  };

    return (
        <section className="container md:py-8 pb-8 relative">
        <div className="flex md:flex-row flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
                <Link to='/' className="w-12 h-12 rounded-full bg-[#F6F6F6] md:hidden flex items-center justify-center">
                    <BackArrow />
                </Link>
                <h2 className="text-[#000000] md:text-[40px] text-base font-semibold leading-[100%]">
                    {t("explore_products")}
                </h2>
            </div>

            <div className="flex gap-3">
                <div className="relative md:hidden block">
                    <input
                        type="text"
                        className="w-55.25 h-12 border border-[#DEDDDD] rounded-4xl px-8 placeholder:text-[#3B3B3B]"
                        placeholder={t("search")}
                    />
                    <div className="absolute top-1">
                        <Search />
                    </div>
                </div>
                <div
                className="md:w-34 w-27.5 md:h-14 h-12 md:bg-[#F6F6F6] bg-[#018884] md:rotate-90 flex items-center justify-center gap-2 cursor-pointer md:rounded-0 rounded-4xl"
                onClick={() => setIsSidebarOpen(true)}
                >
                <Filter />
                <p className="md:text-[#3B3B3B] text-white text-lg font-semibold leading-[100%] md:rotate-180">
                {t("filter")}
                </p>
                </div>
            </div>
        </div>

        <div className="md:mt-12 mt-6">
            <Tabs defaultValue="all">
            <TabsList className="bg-transparent mb-17 flex-wrap gap-4">
                <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                {t("all")}
                </TabsTrigger>
                <TabsTrigger
                value="best"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                {t("best_seller")}
                </TabsTrigger>
                <TabsTrigger
                value="new"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                {t("new_arrival")}
                </TabsTrigger>
                <TabsTrigger
                value="summer"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                {t("summer_collection")}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                <Card image="/images/home/glass1.png" height="135"/>
                <Card image="/images/home/glass2.png" height="135"/>
                <Card image="/images/home/glass3.png" height="135"/>
                <Card image="/images/home/glass1.png" height="135"/>
            </TabsContent>
            <TabsContent value="best" className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                <Card image="/images/home/glass3.png" height="135"/>
                <Card image="/images/home/glass1.png" height="135"/>
                <Card image="/images/home/glass2.png" height="135"/>
                <Card image="/images/home/glass3.png" height="135"/>
            </TabsContent>
            </Tabs>
        </div>

        <div
            className={`fixed top-0 right-0 h-full w-85.75 bg-white shadow-lg transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } z-50 flex flex-col`}
        >
            <div className="p-8 flex flex-col gap-4">
            <h3 className="text-2xl font-medium">{t("filter_by_price")}</h3>
            <p className="text-[#3B3B3B] text-sm font-medium">
                {t("set_prices_range", { min: MIN, max: MAX })}
            </p>

            <div className="mt-6">
                <div className="relative h-10">
                <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>
                <div
                    className="absolute top-1/2 h-1 bg-[#018884] rounded transform -translate-y-1/2"
                    style={{
                    left: `${((minPrice - MIN) / (MAX - MIN)) * 100}%`,
                    width: `${((maxPrice - minPrice) / (MAX - MIN)) * 100}%`,
                    }}
                />
                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={minPrice}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="absolute w-full h-10 bg-transparent pointer-events-none appearance-none"
                    style={{ zIndex: 3 }}
                />
                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={maxPrice}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="absolute w-full h-10 bg-transparent pointer-events-none appearance-none"
                    style={{ zIndex: 4 }}
                />
                </div>

                <div className="flex justify-between gap-4 mt-10">
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="rounded-xl w-full py-4 px-3 text-center bg-[#EDECEC] text-[#0B0B0B] text-base font-medium"
                />
                <span className="flex items-center justify-center text-[#0B0B0B] text-2xl font-medium">:</span>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="rounded-xl w-full py-4 px-3 text-center bg-[#EDECEC] text-[#0B0B0B] text-base font-medium"
                />
                </div>
            </div>

            <button className="mt-6 w-full bg-[#018884] text-[#FEFEFE] py-4 text-lg rounded-4xl font-medium">
                {t("apply")}
            </button>
            <button
                className="w-full text-[#018884] font-semibold text-lg mt-7"
                onClick={resetFilter}
            >
                {t("reset_filter")}
            </button>
            </div>
        </div>

        {isSidebarOpen && (
            <div
            className="fixed inset-0 bg-[#000000B2] z-40"
            onClick={() => setIsSidebarOpen(false)}
            />
        )}
        </section>
    );
};

export default ExploreProductsPage;
