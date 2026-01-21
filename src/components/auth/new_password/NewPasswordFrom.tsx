import ClosedEye from "@/components/icons/auth/ClosedEye"
import BackArrow from "@/components/icons/explore/BackArrow"
import Logo from "@/components/icons/header/Logo"
import { Eye } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                        Create New Password
                    </h2>
                    <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
                        Enter a new password for your account.
                    </p>

                <div className="md:mt-14.5 mt-8 relative">
                    <label htmlFor="password" className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]">
                        New Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute top-13 right-4 cursor-pointer"
                    >
                        {showPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <div className="mt-6 relative">
                    <label htmlFor="confirm_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]">
                        Confirm New Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        className="absolute top-13 right-4 cursor-pointer"
                    >
                        {showConfirmPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <Link to='/otp'>
                    <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
                        Save
                    </button>
                </Link>
            </div>
        </section>
    )
}

export default NewPasswordForm
