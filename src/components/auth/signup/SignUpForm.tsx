import Apple from "@/components/icons/auth/Apple"
import ClosedEye from "@/components/icons/auth/ClosedEye"
import Facebook from "@/components/icons/auth/Facebook"
import Google from "@/components/icons/auth/Google"
import BackArrow from "@/components/icons/explore/BackArrow"
import Logo from "@/components/icons/header/Logo"
import { Link } from "react-router-dom"

const SignUpForm = () => {
    return (
        <section className="container md:py-12">
            <Link to='/' className="md:block hidden">
                <Logo />
            </Link>

            <div className="md:mt-15 mt-8">

                <div className="flex items-center gap-4">
                    <Link to='/' className="w-12 h-12 rounded-full bg-[#F6F6F6] md:hidden flex items-center justify-center">
                        <BackArrow />
                    </Link>
                    <h2 className="text-[#0B0B0B] md:text-[40px] text-base md:font-semibold font-bold leading-[100%] md:mx-auto">
                        Sign Up To create your Account
                    </h2>
                </div>

                <div className="md:mt-14.5 mt-8">
                    <label htmlFor="name" className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]">
                        Name
                    </label>
                    <input
                        type="name"
                        name="name"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mt-8">
                    <label htmlFor="phone" className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]">
                        Phone Number
                    </label>
                    <input
                        type="phone"
                        name="phone"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="+971"
                    />
                </div>

                <div className="mt-8">
                    <label htmlFor="email" className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mt-8 relative">
                    <label htmlFor="password" className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your password"
                    />
                    <div className="absolute top-13 right-4">
                        <ClosedEye />
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <div className="w-full h-px bg-[#DEDDDD]"></div>
                    <p className="text-[#3B3B3B] md:text-sm text-[10px] font-medium">OR</p>
                    <div className="w-full h-px bg-[#DEDDDD]"></div>
                </div>

                <div className="flex items-center justify-center gap-8 md:mt-8 mt-4">
                    <Facebook />
                    <Google />
                    <Apple />
                </div>

                <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
                    Sign Up
                </button>

                <div className="md:mt-4 mt-3 flex items-center justify-center">
                    <p className="text-[#0B0B0B] md:text-base text-xs font-medium">
                        Don’t have an account?{" "}
                        <Link to='/signin' className="text-[#018884] md:text-lg text-base font-bold">Sign In</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm
