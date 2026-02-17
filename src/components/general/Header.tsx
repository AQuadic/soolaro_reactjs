import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../icons/header/Logo";
import Search from "../icons/header/Search";
import Cart from "../icons/header/Cart";
import User from "../icons/header/User";
import Menu from "../icons/header/Menu";
import MobileLogo from "../icons/header/MobileLogo";
import SearchEmptyState from "./SearchEmptyState";
import SearchResults from "./SearchResults";
import SidebarUser from "../icons/header/SidebarUser";
import ChangeLanguage from "./ChangeLanguage";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartItemsCount } from "@/store/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/home/category";
import { getProducts } from "@/lib/api/products/products";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { t, i18n } = useTranslation("header");
  const { user } = useAuthStore();
  const cartItemsCount = useCartItemsCount();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCategory = location.pathname === "/category";

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // Search products query
  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["search-products", debouncedSearchTerm],
    queryFn: () => getProducts({ q: debouncedSearchTerm }),
    enabled: debouncedSearchTerm.length >= 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const selectedCategories = categories?.filter((category) =>
    [6, 7, 8].includes(category.id),
  );

  return (
    <>
      <header
        className={`${isHome ? "bg-[#A8D4D3] py-8" : "bg-[#ffffff]"} ${className ? className : ""}`}
      >
        <div className="container flex items-center justify-between">
          <div className="lg:hidden flex">
            <button onClick={toggleSidebar} aria-label="Open menu">
              <Menu />
            </button>
          </div>
          <Link to="/" className="lg:block hidden">
            {isCategory ? <Logo /> : <Logo />}
          </Link>
          <Link to="/" className="lg:hidden block">
            <MobileLogo />
          </Link>

          <div className="lg:flex hidden items-center gap-8">
            <Link
              to="/"
              className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
            >
              {t("home")}
            </Link>
            <nav className="flex items-center gap-4 my-6">
              {selectedCategories?.map((category) => (
                <Link
                  key={category.id}
                  to={`/category?parent_id=${category.id}`}
                  className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
                  onClick={() => {
                    closeSidebar();
                  }}
                >
                  {category.name[i18n.language as keyof typeof category.name] ||
                    category.name.en}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:flex hidden items-center gap-6">
            <button onClick={toggleSearch} aria-label="Search">
              <Search />
            </button>
            <Link to="/cart" className="relative">
              <Cart />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#018884] text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </Link>
            <ChangeLanguage />
            <Link
              to={user ? "/profile" : "/signin"}
              className="px-8 h-14 bg-[#FFFFFF33] rounded-4xl flex items-center justify-center gap-2"
            >
              <User />
              <p className="text-[#0B0B0B] text-lg font-semibold">
                {user ? user.name : t("login")}
              </p>
            </Link>
          </div>

          <div className="lg:hidden flex">
            <button onClick={toggleSearch} aria-label="Search">
              <Search />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#000000B2] z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
          >
            <div className="p-8">
              <Link to="/" className="mx-auto flex items-center justify-center">
                <MobileLogo />
              </Link>
              <nav className="flex flex-col items-center gap-2 my-6">
                <Link
                  to="/"
                  className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                  onClick={closeSidebar}
                >
                  {t("home")}
                </Link>
                <nav className="flex flex-col items-center gap-4 ">
                  {selectedCategories?.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category?parent_id=${category.id}`}
                      className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
                      onClick={() => {
                        closeSidebar();
                      }}
                    >
                      {category.name[
                        i18n.language as keyof typeof category.name
                      ] || category.name.en}
                    </Link>
                  ))}
                </nav>
              </nav>

              <button className="w-53.75 h-12 bg-[#018884] rounded-4xl flex items-center justify-center gap-2 mx-auto mt-14.5">
                <SidebarUser />
                <Link
                  to={user ? "/profile" : "/signin"}
                  className="text-[#FEFEFE] text-lg font-semibold leading-[100%]"
                >
                  {user ? user.name : t("login")}
                </Link>
              </button>

              <div className="flex items-center justify-center gap-4 mt-6">
                <Link
                  to="/cart"
                  onClick={closeSidebar}
                  className="relative w-12 h-12 bg-[#F6F6F6] rounded-full flex items-center justify-center"
                >
                  <Cart />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#018884] text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemsCount > 99 ? "99+" : cartItemsCount}
                    </span>
                  )}
                </Link>
                <div className="w-12 h-12 bg-[#F6F6F6] rounded-full">
                  <ChangeLanguage />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#000000B2] z-40"
            onClick={closeSearch}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <div className="mx-auto flex items-center justify-center">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-4 md:right-4 bottom-4 w-[343px] md:w-197.25 bg-white shadow-xl z-50 overflow-y-auto rounded-2xl scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
              <div className="p-6">
                {/* <button
                                onClick={closeSearch}
                                className="absolute top-6 right-6 text-2xl text-[#0B0B0B] hover:text-[#003D3B]"
                                aria-label="Close search"
                            >
                                ✕
                            </button> */}

                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("search")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-12 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#A8D4D3]"
                      autoFocus
                    />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Search />
                    </div>
                  </div>
                </div>

                {/* Search Results */}
                {debouncedSearchTerm.length >= 2 ? (
                  <SearchResults
                    products={searchResults?.data || []}
                    isLoading={isSearchLoading}
                    searchTerm={debouncedSearchTerm}
                    onClose={closeSearch}
                  />
                ) : (
                  <div className="py-32">
                    <SearchEmptyState />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
