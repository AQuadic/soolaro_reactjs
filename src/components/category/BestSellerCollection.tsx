import { useMemo, useState, useEffect } from "react";
import Card from "../home/GlassCard";
import Filter from "../icons/explore/Filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getProducts, type Product } from "@/lib/api/products/products";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import ProductEmptyState from "../product_details/ProductEmptyState";
import { useTranslation } from "react-i18next";

interface BestSellerCollectionProps {
  parentId: number;
  categoryName?: string;
}

const BestSellerCollection = ({
  parentId,
  categoryName,
}: BestSellerCollectionProps) => {
    const { t, i18n } = useTranslation("explore");
    const isRTL = i18n.language === "ar";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [tempMinPrice, setTempMinPrice] = useState(100);
    const [tempMaxPrice, setTempMaxPrice] = useState(10000);
    const [activeTab, setActiveTab] = useState("all");
    const MIN = 100;
    const MAX = 10000;

    const { data, isLoading } = useQuery({
        queryKey: ["categoryProducts", parentId],
        queryFn: () =>
            getProducts({ page: 1 }).then((res) =>
                res.data.filter((p) => p.category_id === parentId)
            ),
        enabled: !!parentId,
    });

    const filteredByPrice = useMemo(() => {
        if (!data) return [];
        return data.filter((product) => {
            const price = product.variants[0]?.final_price || 0;
            return price >= minPrice && price <= maxPrice;
        });
    }, [data, minPrice, maxPrice]);

    const sortedByLatest = useMemo(() => {
        if (!filteredByPrice) return [];
        return [...filteredByPrice].sort(
            (a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }, [filteredByPrice]);

    const handleMinChange = (value: number) => {
        if (value <= tempMaxPrice) {
            setTempMinPrice(value);
        }
    };

    const handleMaxChange = (value: number) => {
        if (value >= tempMinPrice) {
            setTempMaxPrice(value);
        }
    };

    const resetFilter = () => {
        setTempMinPrice(MIN);
        setTempMaxPrice(MAX);
        setMinPrice(MIN);
        setMaxPrice(MAX);
    };

    const applyFilter = () => {
        setMinPrice(tempMinPrice);
        setMaxPrice(tempMaxPrice);
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        if (isSidebarOpen) {
            setTempMinPrice(minPrice);
            setTempMaxPrice(maxPrice);
        }
    }, [isSidebarOpen, minPrice, maxPrice]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10">
                <Loader className="animate-spin" />
            </div>
        );
    }


  return (
        <section className="container md:py-17 py-8">
            <div className="flex justify-between">
                <h2 className="text-[#000000] md:text-[40px] text-base font-medium leading-[100%] px-12 md:px-8">
                {categoryName
                    ? `${categoryName}`
                    : "-"}
                </h2>

                <div
                    className="md:w-34 w-27.5 md:h-14 h-12 md:bg-[#F6F6F6] bg-[#018884] rotate-90 flex items-center justify-center gap-2 cursor-pointer absolute -right-7 md:top-137.5 top-61.5"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Filter />
                    <p className="md:text-[#3B3B3B] text-white text-lg font-semibold leading-[100%] rotate-180">
                        {t('filter')}
                    </p>
                </div>
            </div>

            <div className="md:mt-12 mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <TabsList className="bg-transparent md:mb-17 mb-6 flex-wrap gap-4 px-10 md:px-0" >
                <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                {t('all')}
                </TabsTrigger>
                <TabsTrigger
                value="latest"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                {t('latest_products')}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                {filteredByPrice.length > 0 ? (
                    filteredByPrice.map((product: Product) => (
                        <Card
                            key={product.id}
                            product={product}
                            showHeart={true}
                        />
                    ))
                ) : (
                    <ProductEmptyState />
                )}
            </TabsContent>
            
            <TabsContent value="latest" className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                {sortedByLatest.length > 0 ? (
                    sortedByLatest.map((product: Product) => (
                        <Card
                            key={product.id}
                            product={product}
                            showHeart={true}
                        />
                    ))
                ) : (
                    <div>
                        <ProductEmptyState />
                    </div>
                )}
            </TabsContent>
            </Tabs>
        </div>

        <div
            className={`fixed top-0 right-0 h-full w-85.75 bg-white shadow-lg transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } z-50 flex flex-col`}
        >
            <div className="p-8 flex flex-col gap-4">
                <h3 className="text-2xl font-medium">{t('filter_by_price')}</h3>
                <p className="text-[#3B3B3B] text-sm font-medium">
                    {t("set_prices_range", { min: MIN, max: MAX })}
                </p>

            <div className="mt-6">
                <div className="relative h-10">
                <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2 pointer-events-none"></div>
                <div
                    className="absolute top-1/2 h-1 bg-[#018884] rounded -translate-y-1/2"
                    style={{
                    left: `${((tempMinPrice - MIN) / (MAX - MIN)) * 100}%`,
                    width: `${((tempMaxPrice - tempMinPrice) / (MAX - MIN)) * 100}%`,
                    }}
                />
                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={tempMinPrice}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="absolute w-full h-6 bg-transparent appearance-none price-range-slider"
                    style={{ zIndex: tempMinPrice > (MIN + MAX) / 2 ? 5 : 3 }}
                    dir={isRTL ? "rtl" : "ltr"}
                />
                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={tempMaxPrice}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="absolute w-full h-6 bg-transparent appearance-none price-range-slider"
                    style={{ zIndex: tempMaxPrice > (MIN + MAX) / 2 ? 5 : 3 }}
                    dir={isRTL ? "rtl" : "ltr"}
                />
            </div>

                <div className="flex justify-between gap-4 mt-10">
                <input
                    type="number"
                    value={tempMinPrice}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="rounded-xl w-full py-4 px-3 text-center bg-[#EDECEC] text-[#0B0B0B] text-base font-medium appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <span className="flex items-center justify-center text-[#0B0B0B] text-2xl font-medium">:</span>
                <input
                    type="number"
                    value={tempMaxPrice}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="rounded-xl w-full py-4 px-3 text-center bg-[#EDECEC] text-[#0B0B0B] text-base font-medium appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                </div>
            </div>

            <button className="mt-6 w-full bg-[#018884] text-[#FEFEFE] py-4 text-lg rounded-4xl font-medium"onClick={applyFilter}>
                {t('apply')}
            </button>
            <button
                className="w-full text-[#018884] font-semibold text-lg mt-7"
                onClick={resetFilter}
            >
                {t('reset_filter')}
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
    )
}

export default BestSellerCollection
