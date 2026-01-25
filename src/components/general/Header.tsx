import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../icons/header/Logo";
import Search from "../icons/header/Search";
import Cart from "../icons/header/Cart";
import Language from "../icons/header/Language";
import User from "../icons/header/User";
import Menu from "../icons/header/Menu";
import MobileLogo from "../icons/header/MobileLogo";
import SearchEmptyState from "./SearchEmptyState";
import SidebarUser from "../icons/header/SidebarUser";
import CategoryLogo from "../icons/category/Logo";
import ChangeLanguage from "./ChangeLanguage";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { t } = useTranslation("header");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
  };

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCategory = location.pathname === "/category";

  return (
    <>
      <header
        className={`md:py-8 py-8 ${isHome ? "bg-[#A8D4D3]" : "bg-transparent"} ${className ? className : ""}`}
      >
        <div className="container flex items-center justify-between">
          <div className="lg:hidden flex">
            <button onClick={toggleSidebar} aria-label="Open menu">
              <Menu />
            </button>
          </div>
          <Link to="/" className="lg:block hidden">
            {isCategory ? <CategoryLogo /> : <Logo />}
          </Link>
          <Link to="/" className="lg:hidden block">
            <MobileLogo />
          </Link>

          <div className="lg:flex hidden items-center gap-8">
            <Link
              to="/"
              className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
            >
              {t('home')}
            </Link>
            <Link
              to="/"
              className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
            >
              {t('best_seller')}
            </Link>
            <Link
              to="/"
              className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
            >
              {t('new_arrival')}
            </Link>
            <Link
              to="/"
              className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold"
            >
              {t('summer_collection')}
            </Link>
          </div>

          <div className="lg:flex hidden items-center gap-6">
            <button onClick={toggleSearch} aria-label="Search">
              <Search />
            </button>
            <Link to="/cart">
              <Cart />
            </Link>
            <ChangeLanguage />
            <Link to='/signin' className="w-37.25 h-14 bg-[#FFFFFF33] rounded-4xl flex items-center justify-center gap-2">
              <User />
              <p className="text-[#0B0B0B] text-lg font-semibold">{t('login')}</p>
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
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
          >
            <div className="p-8">
              <div className="mx-auto flex items-center justify-center">
                <MobileLogo />
              </div>
              <nav className="flex flex-col items-center gap-2 my-6">
                <Link
                  to="/"
                  className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                  onClick={closeSidebar}
                >
                  {t('home')}
                </Link>
                <Link
                  to="/"
                  className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                  onClick={closeSidebar}
                >
                  {t('best_seller')}
                </Link>
                <Link
                  to="/"
                  className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                  onClick={closeSidebar}
                >
                  {t('new_arrival')}
                </Link>
                <Link
                  to="/"
                  className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                  onClick={closeSidebar}
                >
                  {t('summer_collection')}
                </Link>
              </nav>

              <button className="w-53.75 h-12 bg-[#018884] rounded-4xl flex items-center justify-center gap-2 mx-auto mt-14.5">
                <SidebarUser />
                <Link to='/signin' className="text-[#FEFEFE] text-lg font-semibold leading-[100%]">
                  {t('login')}
                </Link>
              </button>

              <div className="flex items-center justify-center gap-4 mt-6">
                <Link
                  to="/cart"
                  onClick={closeSidebar}
                  className="w-12 h-12 bg-[#F6F6F6] rounded-full flex items-center justify-center"
                >
                  <Cart />
                </Link>
                <div className="w-12 h-12 bg-[#F6F6F6] rounded-full">
                  <Language />
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
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-4 md:right-4 bottom-4 w-full md:w-197.25 bg-white shadow-xl z-50 overflow-y-auto rounded-2xl scrollbar-hide"
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
                    placeholder="Search..."
                    className="w-full px-12 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#A8D4D3]"
                    autoFocus
                  />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search />
                  </div>
                </div>
              </div>

              {/* <div className="space-y-4">
                                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <div className="w-21 h-21 bg-[#F6F6F6] rounded-lg flex items-center justify-center">
                                            <img
                                                src="/images/home/glass3.png"
                                                alt="glass"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[#0B0B0B] font-medium text-2xl">Liva-Black</h3>
                                            <p className="text-[#3B3B3B] text-sm mt-4">AED 26900</p>
                                        </div>
                                    </div>
                                ))}
                            </div> */}

              <div className="py-32">
                <SearchEmptyState />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
