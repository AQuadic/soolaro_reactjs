import { Link } from "react-router-dom"
import Phone from "../icons/footer/Phone"
import Email from "../icons/footer/Email"
import Clover from "../icons/footer/Clover"

const Footer = () => {
    return (
        <footer className="bg-[#018884]">
            <div className="container md:py-14.5 py-8">
                <div className="flex flex-wrap justify-between gap-6">
                    <div>
                        <h2 className="text-[#FEFEFE] md:text-5xl text-lg font-bold md:text-start text-center">
                            Join Our Newsletter
                        </h2>
                        <p className="md:w-175 text-[#F6F6F6] md:text-base text-xs font-medium leading-[150%] md:mt-6 mt-4 md:text-start text-center">
                            Subscribe to our newsletter and be the first to receive exclusive offers, the latest news, and inspiring updates directly to your inbox."
                        </p>

                        <div className="mt-6 relative md:w-171.75 w-full">
                            <input
                                type="text"
                                className="md:w-171.75 w-full h-14 border border-[#F6F6F6] rounded-4xl px-3 placeholder:text-[#F6F6F6]"
                                placeholder="your email"
                            />
                            <button className="w-25.75 h-14 bg-[#FEFEFE] rounded-tr-4xl rounded-br-4xl absolute top-0 right-0">
                                Join
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mx-auto">
                        <h2 className="text-[#FEFEFE] md:text-5xl text-lg font-bold text-center">
                            Follow Us
                        </h2>

                        <div className="flex items-center justify-center mx-auto gap-6 md:mt-6 mt-3">
                            <Link to='/' className="text-[#F6F6F6] md:text-xl text-xs font-medium">Face Book</Link>
                            <Link to='/' className="text-[#F6F6F6] md:text-xl text-xs font-medium">X</Link>
                            <Link to='/' className="text-[#F6F6F6] md:text-xl text-xs font-medium">Instagram</Link>
                            <Link to='/' className="text-[#F6F6F6] md:text-xl text-xs font-medium">YouTube</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-14.5">
                    <h2 className="text-[#FEFEFE] md:text-[48px] text-lg font-bold leading-[100%] md:text-start text-center">
                        Resources
                    </h2>
                    <div className="md:mt-8 mt-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-between gap-8">
                        <div className="flex flex-col items-center md:items-start gap-3">
                            <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">Links</h3>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Home</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Best Seller</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">New Arrival</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Summer Collection</Link>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-3">
                            <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">Customer Care</h3>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Create Account - Log In</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">My Orders</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">FAQs</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Contact Us</Link>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-3">
                            <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">Contact Us</h3>
                            <a href="tel:+971504229594" className="flex items-center gap-2">
                                <Phone />
                                <p className="text-[#F6F6F6] text-sm font-medium">+97150 4229594</p>
                                </a>

                                <a href="mailto:support@soolaro.ae" className="flex items-center gap-2">
                                <Email />
                                <p className="text-[#F6F6F6] text-sm font-medium">support@soolaro.ae</p>
                                </a>
                            <a href="" className="flex items-center gap-2">
                                <Clover />
                                <p className="text-[#F6F6F6] text-sm font-medium">Clover Bay Tower</p>
                            </a>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-3">
                            <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">Legal</h3>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Privacy Policy</Link>
                            <Link to='/' className="text-[#FEFEFE] md:text-base text-xs font-semibold">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>

                <div className="md:mt-20 mt-10 flex flex-col items-center">
                    <p className="text-[#F6F6F6] md:text-base text-[8px] font-medium leading-[100%]">
                        Copyright © Soolaro 2026. All rights reserved.
                    </p>
                    <img 
                        src="/images/footer/payment.png" 
                        alt="payment"
                        className="md:mt-4 mt-3 md:w-70 w-38.25"
                    />
                </div>
            </div>
        </footer>
    )
}

export default Footer
