import Apple from "@/components/icons/auth/Apple";
import ClosedEye from "@/components/icons/auth/ClosedEye";
import Facebook from "@/components/icons/auth/Facebook";
import Google from "@/components/icons/auth/Google";
import Logo from "@/components/icons/header/Logo";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { PhoneInput, type PhoneValue } from "@/components/ui/PhoneInput";
import { useState } from "react";
import { Eye } from "lucide-react";

const SignUpForm = () => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    phone: PhoneValue | string;
    email: string;
    password: string;
  }>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const onChange = (field: "name" | "phone" | "email" | "password", value: string | PhoneValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="container md:py-12">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-15 mt-8">
        <MobileBackHeader title={t("sign_up_to_account")} />
        <h2 className="hidden md:block text-[#0B0B0B] text-[40px] font-semibold leading-[100%] mx-auto mb-14.5">
          {t("sign_up_to_account")}
        </h2>

        <div className="md:mt-14.5 mt-8">
          <label
            htmlFor="name"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("name")}
          </label>
          <input
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            type="text"
            name="name"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder={t("enter_name")}
          />
        </div>

        <div className="mt-8">
          <label
            htmlFor="phone"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("phone_number")}
          </label>
          <PhoneInput
            value={formData.phone as PhoneValue} // cast safe for PhoneInput
            onChange={(value) => onChange("phone", value)}
            radius="md"
            className="h-12 md:h-14 rounded-[20px] border-[#DEDDDD] mt-3"
          />
        </div>

        <div className="mt-8">
          <label
            htmlFor="email"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("email")}
          </label>
          <input
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            type="email"
            name="email"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder={t("enter_email")}
          />
        </div>

        <div className="mt-8 relative">
          <label
            htmlFor="password"
            className="text-[#0B0B0B] md:text-base text-sm font-semibold leading-[100%]"
          >
            {t("password")}
          </label>
          <input
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            type="password"
            name="password"
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
            placeholder={t("enter_password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
          >
            {showPassword ? <Eye /> : <ClosedEye />}
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <div className="w-full h-px bg-[#DEDDDD]"></div>
          <p className="text-[#3B3B3B] md:text-sm text-[10px] font-medium">
            {t("or")}
          </p>
          <div className="w-full h-px bg-[#DEDDDD]"></div>
        </div>

        <div className="flex items-center justify-center gap-8 md:mt-8 mt-4">
          <Facebook />
          <Google />
          <Apple />
        </div>

        <button className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 mt-6 text-[#FEFEFE] text-base font-bold">
          {t("sign_up")}
        </button>

        <div className="md:mt-4 mt-3 flex items-center justify-center">
          <p className="text-[#0B0B0B] md:text-base text-xs font-medium">
            {t("already_have_account")}{" "}
            <Link
              to="/signin"
              className="text-[#018884] md:text-lg text-base font-bold"
            >
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
