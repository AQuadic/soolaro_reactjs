import BackArrow from "@/components/icons/explore/BackArrow"
import Logo from "@/components/icons/header/Logo"
import { Link } from "react-router-dom"

const ForgetPassForm = () => {
    return (
        <section className="container md:py-12">
            <Link to='/' className="md:block hidden">
                <Logo />
            </Link>

            <div className="md:mt-34 mt-8">

                    <Link to='/' className="w-12 h-12 rounded-full bg-[#F6F6F6] md:hidden flex items-center justify-center">
                        <BackArrow />
                    </Link>
                    <h2 className="text-[#0B0B0B] md:text-[40px] text-base md:font-semibold font-bold leading-[100%] text-center mx-auto mt-6">
                        Forget Password
                    </h2>
                    <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
                        Enter your email address below, and we’ll send you a code to reset your password.
                    </p>

                <div className="md:mt-14.5 mt-8">
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

                <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
                    Send
                </button>
            </div>
        </section>
    )
}

export default ForgetPassForm
