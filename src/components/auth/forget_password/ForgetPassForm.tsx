import BackArrow from "@/components/icons/explore/BackArrow";
import Logo from "@/components/icons/header/Logo";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";

const ForgetPassForm = () => {
  return (
    <section className="container md:py-12">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-34 mt-8">
        <MobileBackHeader />
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] text-center mx-auto mt-6">
          Forget Password
        </h2>
        <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
          Enter your email address below, and we’ll send you a code to reset
          your password.
        </p>

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

        <Link to="/otp">
          <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
            Send
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ForgetPassForm;
