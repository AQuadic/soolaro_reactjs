import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import Logo from "../icons/header/Logo"
import Search from "../icons/header/Search"
import Cart from "../icons/header/Cart"
import Language from "../icons/header/Language"
import User from "../icons/header/User"
import Menu from "../icons/header/Menu"
import MobileLogo from "../icons/header/MobileLogo"

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    return (
        <>
            <header className="bg-[#A8D4D3] md:py-12 py-8">
                <div className="container flex items-center justify-between">
                    <div className="lg:hidden flex">
                        <button onClick={toggleSidebar} aria-label="Open menu">
                            <Menu />
                        </button>
                    </div>
                    <Link to='/' className="lg:block hidden">
                        <Logo />
                    </Link>
                    <Link to='/' className="lg:hidden block">
                        <MobileLogo />
                    </Link>

                    <div className="lg:flex hidden items-center gap-8">
                        <Link to='/' className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold">Home</Link>
                        <Link to='/' className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold">Best Seller</Link>
                        <Link to='/' className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold">New Arrival</Link>
                        <Link to='/' className="text-[#0B0B0B] text-base font-semibold hover:text-[#003D3B] hover:font-bold">Summer Collection</Link>
                    </div>

                    <div className="lg:flex hidden items-center gap-6">
                        <Search />
                        <Cart />
                        <Language />
                        <div className="w-37.25 h-14 bg-[#FFFFFF33] rounded-4xl flex items-center justify-center gap-2">
                            <User />
                            <p className="text-[#0B0B0B] text-lg font-semibold">Log In</p>
                        </div>
                    </div>

                    <div className="lg:hidden flex">
                        <Search />
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
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
                        <div className="p-4">
                            <button
                                onClick={closeSidebar}
                                className="absolute top-6 right-6 text-2xl text-[#0B0B0B] hover:text-[#003D3B]"
                                aria-label="Close menu"
                            >
                                ✕
                            </button>

                            <nav className="flex flex-col gap-4 mb-8">
                                <Link 
                                    to='/' 
                                    className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                                    onClick={closeSidebar}
                                >
                                    Home
                                </Link>
                                <Link 
                                    to='/' 
                                    className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                                    onClick={closeSidebar}
                                >
                                    Best Seller
                                </Link>
                                <Link 
                                    to='/' 
                                    className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                                    onClick={closeSidebar}
                                >
                                    New Arrival
                                </Link>
                                <Link 
                                    to='/' 
                                    className="text-[#0B0B0B] text-lg font-semibold hover:text-[#003D3B] py-2"
                                    onClick={closeSidebar}
                                >
                                    Summer Collection
                                </Link>
                            </nav>

                            <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                    <Cart />
                                    <span className="text-[#0B0B0B] text-base font-semibold">Cart</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Language />
                                    <span className="text-[#0B0B0B] text-base font-semibold">Language</span>
                                </div>
                                <button className="w-full h-14 bg-[#A8D4D3] rounded-lg flex items-center justify-center gap-2 mt-4">
                                    <User />
                                    <p className="text-[#0B0B0B] text-lg font-semibold">Log In</p>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header