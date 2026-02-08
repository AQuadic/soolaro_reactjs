import { useState, useEffect } from "react";
import Card from "@/components/home/GlassCard";
import Filter from "@/components/icons/explore/Filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackArrow from "@/components/icons/explore/BackArrow";
import { Link } from "react-router-dom";
import Search from "@/components/icons/header/Search";
import { useTranslation } from "react-i18next";
import { DirhamIcon } from "@/components/icons/checkout/DirhamIcon";
import ProductEmptyState from "@/components/product_details/ProductEmptyState";
import {
  getProducts,
  type GetProductsParams,
  type Product,
} from "@/lib/api/products/products";

const ExploreProductsPage = () => {
  const { t, i18n } = useTranslation("explore");
  const isRTL = i18n.language === "ar";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempMinPrice, setTempMinPrice] = useState(100);
  const [tempMaxPrice, setTempMaxPrice] = useState(1000);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const MIN = 100;
  const MAX = 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: GetProductsParams = {
          page: currentPage,
          sort_by: "created_at",
          sort_order: "desc",
        };

        if (minPrice !== MIN || maxPrice !== MAX) {
          params.min_price = minPrice;
          params.max_price = maxPrice;
        }

        if (debouncedSearch.trim()) {
          params.search = debouncedSearch;
        }

        const response = await getProducts(params);
        setProducts(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products",
        );
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, minPrice, maxPrice, debouncedSearch]);

  useEffect(() => {
    let result = [...products];

    if (activeTab === "best") {
      result = result.filter((product) => product.is_top_rated === 1);
    } else if (activeTab === "new") {
      result = result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (activeTab === "summer") {
      result = result.filter((product) => product.is_featured === 1);
    }

    setFilteredProducts(result);
  }, [products, activeTab]);

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
    setSearchQuery("");
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

  // Close sidebar when language changes to avoid visual transition
  useEffect(() => {
    const handleLanguageChange = () => {
      setIsLanguageChanging(true);
      setIsSidebarOpen(false);
      setTimeout(() => setIsLanguageChanging(false), 50);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  if (loading) {
    return (
      <section className="container md:py-8 pb-8 relative">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#018884]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="container md:py-8 pb-8 relative">
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-12 h-12 rounded-full bg-[#F6F6F6] md:hidden flex items-center justify-center"
          >
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-55.25 h-12 border border-[#DEDDDD] rounded-4xl px-8 placeholder:text-[#3B3B3B]"
              placeholder={t("search")}
            />
            <div className="absolute top-1">
              <Search />
            </div>
          </div>
          <div
            className="group md:w-34 w-27.5 md:h-14 h-12 md:bg-[#F6F6F6] bg-[#018884] hover:bg-[#018884] md:rotate-90 flex items-center justify-center gap-2 cursor-pointer md:rounded-none rounded-4xl transition-colors duration-300"
            onClick={() => setIsSidebarOpen(true)}
          >
            <div className="group-hover:hidden transition-all duration-300">
              <Filter />
            </div>

            <img
              src="/images/options.gif"
              alt="options"
              className="w-6 h-6 hidden group-hover:block transition-all duration-300"
            />

            <p className="md:text-[#3B3B3B] text-white group-hover:text-white text-lg font-semibold leading-[100%] md:rotate-180 transition-colors duration-300">
              {t("filter")}
            </p>
          </div>
        </div>
      </div>

      <div className="md:mt-12 mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent mb-17 flex-nowrap overflow-x-auto w-full justify-start gap-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] px-6 py-4 shrink-0 flex-none transition-all duration-200"
            >
              {t("all")}
            </TabsTrigger>
            <TabsTrigger
              value="best"
              className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] px-6 py-4 shrink-0 flex-none transition-all duration-200"
            >
              {t("best_seller")}
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] px-6 py-4 shrink-0 flex-none transition-all duration-200"
            >
              {t("new_arrival")}
            </TabsTrigger>
            <TabsTrigger
              value="summer"
              className="data-[state=active]:bg-[#018884] bg-[#F6F6F6] data-[state=active]:text-white text-[#3B3B3B] rounded-[100px] px-6 py-4 shrink-0 flex-none transition-all duration-200"
            >
              {t("summer_collection")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredProducts.length > 0 ? (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    product={product}
                    showHeart={true}
                    height="h-44.25"
                  />
                ))}
              </div>
            ) : (
              <ProductEmptyState />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[343px] bg-white shadow-lg transform ${
          isLanguageChanging ? "" : "transition-transform duration-300"
        } ${
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
              <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded -translate-y-1/2"></div>
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
              <div className="relative w-full">
                <input
                  type="number"
                  value={tempMinPrice}
                  onChange={(e) => handleMinChange(Number(e.target.value))}
                  className="rounded-xl w-full py-4 px-8 text-center bg-[#EDECEC] text-[#0B0B0B] text-base font-medium appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <div
                  className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 pointer-events-none`}
                >
                  <DirhamIcon className="w-4 h-4 text-[#0B0B0B]" />
                </div>
              </div>
              <span className="flex items-center justify-center text-[#0B0B0B] text-2xl font-medium">
                :
              </span>
              <div className="relative w-full">
                <input
                  type="number"
                  value={tempMaxPrice}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  className="rounded-xl w-full py-4 px-8 text-center bg-[#EDECEC] text-[#0B0B0B] text-base font-medium appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <div
                  className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 pointer-events-none`}
                >
                  <DirhamIcon className="w-4 h-4 text-[#0B0B0B]" />
                </div>
              </div>
            </div>
          </div>

          <button
            className="mt-6 w-full bg-[#018884] text-[#FEFEFE] py-4 text-lg rounded-4xl font-medium"
            onClick={applyFilter}
          >
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
