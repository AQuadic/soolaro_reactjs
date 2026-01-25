import { useState } from "react";
import Card from "../home/GlassCard"
import Filter from "../icons/explore/Filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const BestSellerCollection = () => {
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
        <section className="container md:py-17 py-8">
            <div className="flex justify-between">
                <h2 className="text-[#000000] md:text-[40px] text-base font-medium leading-[100%]">
                    Best Seller Collection 2026
                </h2>

                <div
                    className="md:w-34 w-27.5 md:h-14 h-12 md:bg-[#F6F6F6] bg-[#018884] rotate-90 flex items-center justify-center gap-2 cursor-pointer absolute -right-7 md:top-137.5 top-61.5"
                    onClick={() => setIsSidebarOpen(true)}
                    >
                    <Filter />
                    <p className="md:text-[#3B3B3B] text-white text-lg font-semibold leading-[100%] rotate-180">
                        Filter
                    </p>
                </div>
            </div>

            <div className="md:mt-12 mt-6">
            <Tabs defaultValue="all">
            <TabsList className="bg-transparent md:mb-17 mb-6 flex-wrap gap-4">
                <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                All
                </TabsTrigger>
                <TabsTrigger
                value="latest"
                className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] md:px-8 py-4"
                >
                Latest Products
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                <Card image="/images/home/glass1.png" height="135"/>
                <Card image="/images/home/glass2.png" height="135"/>
                <Card image="/images/home/glass3.png" height="135"/>
                <Card image="/images/home/glass1.png" height="135"/>
            </TabsContent>
            <TabsContent value="latest" className="grid lg:grid-cols-3 grid-cols-2 gap-8">
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
            <h3 className="text-2xl font-medium">Filter by price</h3>
            <p className="text-[#3B3B3B] text-sm font-medium flex items-center">
                Set prices between 100 
                <img
                    src="/images/currency.png"
                    alt="c_currency"
                    className="w-4.5 h-4.5"
                />
                    and 1000 
                    
                    <img
                        src="/images/currency.png"
                        alt="c_currency"
                        className="w-4.5 h-4.5"
                    />.
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
                Apply
            </button>
            <button
                className="w-full text-[#018884] font-semibold text-lg mt-7"
                onClick={resetFilter}
            >
                Reset Filter
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
