import Apple from "@/components/icons/auth/Apple";
import ClosedEye from "@/components/icons/auth/ClosedEye";
import Facebook from "@/components/icons/auth/Facebook";
import Google from "@/components/icons/auth/Google";
import BackArrow from "@/components/icons/explore/BackArrow";
import Logo from "@/components/icons/header/Logo";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="container md:py-12">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-34 mt-8">
        <MobileBackHeader title="Sign In To your Account" />
        <h2 className="hidden md:block text-[#0B0B0B] text-[40px] font-semibold leading-[100%] mx-auto mb-14.5">
          Sign In To your Account
        </h2>

        <div className="md:mt-14.5 mt-8">
          <label
            htmlFor="email"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
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
          <label
            htmlFor="password"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-13 right-4 cursor-pointer"
          >
            {showPassword ? <Eye /> : <ClosedEye />}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <p className="text-[#0B0B0B] md:text-base text-xs font-medium leading-[100%]">
              Remember Me
            </p>
          </div>
          <Link
            to="/forget_password"
            className="text-[#018884] md:text-base text-xs font-bold leading-[100%]"
          >
            Forget Password ?
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2">
          <div className="w-full h-px bg-[#DEDDDD]"></div>
          <p className="text-[#3B3B3B] md:text-sm text-[10px] font-medium">
            OR
          </p>
          <div className="w-full h-px bg-[#DEDDDD]"></div>
        </div>

        <div className="flex items-center justify-center gap-8 md:mt-8 mt-4">
          <Facebook />
          <Google />
          <Apple />
        </div>

        <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
          Sign In
        </button>

        <div className="md:mt-4 mt-3 flex items-center justify-center">
          <p className="text-[#0B0B0B] md:text-base text-xs font-medium">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#018884] md:text-lg text-base font-bold"
            >
              Sign Up{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
