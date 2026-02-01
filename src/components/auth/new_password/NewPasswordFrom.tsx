import ClosedEye from "@/components/icons/auth/ClosedEye";
import Logo from "@/components/icons/header/Logo";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";

const NewPasswordForm = () => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="container">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-34 mt-8">
        <MobileBackHeader />
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] text-center mx-auto mt-6">
          {t("creating_new_password")}
        </h2>
        <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
          {t("enter_new_password_instruction")}
        </p>

        <div className="md:mt-14.5 mt-8 relative">
          <label
            htmlFor="password"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("new_password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder={t("enter_your_password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
          >
            {showPassword ? <Eye /> : <ClosedEye />}
          </button>
        </div>

        <div className="mt-6 relative">
          <label
            htmlFor="confirm_password"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("confirm_new_password")}
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder={t("enter_your_password")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
          >
            {showConfirmPassword ? <Eye /> : <ClosedEye />}
          </button>
        </div>

        <Link to="/signin">
          <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
            {t("save")}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NewPasswordForm;
