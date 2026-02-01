import Logo from "@/components/icons/header/Logo";
import { Link, useNavigate } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";

const ForgetPassForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  return (
    <section className="container">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-34 mt-8">
        <MobileBackHeader onBack={() => navigate(-1)} />
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] text-center mx-auto mt-6">
          {t("forget_password")}
        </h2>
        <p className="text-[#3B3B3B] text-base font-medium leading-[150%] mt-6 text-center">
          {t("forget_password_desc")}
        </p>

        <div className="md:mt-14.5 mt-8">
          <label
            htmlFor="email"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("email")}
          </label>
          <input
            type="email"
            name="email"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder={t("enter_email")}
          />
        </div>

        <Link to="/otp">
          <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
            {t("send")}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ForgetPassForm;
