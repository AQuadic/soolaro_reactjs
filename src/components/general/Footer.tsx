import { Link } from "react-router-dom";
import Phone from "../icons/footer/Phone";
import Email from "../icons/footer/Email";
import Clover from "../icons/footer/Clover";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getPages, type Page } from "@/lib/api/pages";
import {
  getStoreSetting,
  type StoreSettingResponse,
} from "@/lib/api/storeSetting";
import Strip from "../icons/footer/Strip";
import Amex from "../icons/footer/Amex";
import Mastercard from "../icons/footer/Mastercard";
import GooglePay from "../icons/footer/GooglePay";
import Visa from "../icons/footer/Visa";
import ApplePay from "../icons/footer/ApplePay";
// import Tabby from "../icons/footer/Tabby";
import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/api/subscribe";
import toast from "react-hot-toast";
import { getCategories } from "@/lib/api/home/category";
import { useAuthStore } from "@/store/useAuthStore";

const Footer = () => {
  const { t, i18n } = useTranslation("header");
  const { t: tProfile } = useTranslation("profile");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  const { data: pages = [] } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  const { data: storeSetting } = useQuery<StoreSettingResponse>({
    queryKey: ["store-setting"],
    queryFn: getStoreSetting,
  });

  const social = storeSetting?.social;

  const handleSubscribe = async () => {
    if (!email) {
      toast.dismiss();
      toast.error(t("please_enter_email") || "Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await subscribeToNewsletter({ email });
      toast.dismiss();
      toast.success(response.message);
      setEmail("");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || t("subscription_failed"));
    } finally {
      setLoading(false);
    }
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const selectedCategories = categories?.filter(category =>
    [6, 7, 8].includes(category.id)
  );

  return (
    <footer className="bg-[#018884]">
      <div className="container md:py-14.5 py-8">
        <div className="flex flex-wrap justify-between gap-6">
          <div>
            <h2 className="text-[#FEFEFE] md:text-5xl text-lg font-bold md:text-start text-center">
              {t("join_newsletter")}
            </h2>
            <p className="md:w-175 text-[#F6F6F6] md:text-base text-xs font-medium leading-[150%] md:mt-6 mt-4 md:text-start text-center">
              {t("newsletter_description")}
            </p>

            <div className="mt-6 relative md:w-171.75 w-full">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:w-171.75 w-full h-14 border border-[#F6F6F6] rounded-4xl px-3 text-[#F6F6F6] placeholder:text-[#F6F6F6]"
                placeholder={t("your_email")}
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="text-[#018884] text-lg font-bold w-25.75 h-14 bg-[#FEFEFE] ltr:rounded-tr-4xl rtl:rounded-tl-4xl ltr:rounded-br-4xl rtl:rounded-bl-4xl absolute top-0 ltr:right-0 rtl:left-0 disabled:opacity-50"
              >
                {loading ? t("joining") : t("join")}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center mx-auto">
            <h2 className="text-[#FEFEFE] md:text-5xl text-lg font-bold text-center">
              {t("follow_us")}
            </h2>

            <div className="flex items-center justify-center mx-auto gap-6 md:mt-6 mt-3">
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F6F6F6] md:text-xl text-xs font-medium"
                >
                  Facebook
                </a>
              )}

              {social?.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F6F6F6] md:text-xl text-xs font-medium"
                >
                  X
                </a>
              )}

              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F6F6F6] md:text-xl text-xs font-medium"
                >
                  Instagram
                </a>
              )}

              {social?.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F6F6F6] md:text-xl text-xs font-medium"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14.5">
          <h2 className="text-[#FEFEFE] md:text-[48px] text-lg font-bold leading-[100%] md:text-start text-center">
            {t("resources")}
          </h2>
          <div className="md:mt-8 mt-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">
                {t("links")}
              </h3>
              <Link
                to="/"
                className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
              >
                {t("home")}
              </Link>
              <nav className="flex flex-col items-center md:items-start gap-4">
                {selectedCategories?.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category?parent_id=${category.id}`}
                    className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
                  >
                    {category.name[i18n.language as keyof typeof category.name] || category.name.en}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">
                {t("customer_care")}
              </h3>
              <Link
                to="/profile"
                className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
              >
                {isAuthenticated ? tProfile("myProfile") : t("create_account")}
              </Link>
              <Link
                to="/"
                className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
              >
                {t("my_orders")}
              </Link>
              <Link
                to="/faq"
                className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
              >
                {t("faqs")}
              </Link>
              <Link
                to="/contact_us"
                className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
              >
                {t("contact_us")}
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">
                {t("contact_us")}
              </h3>
              {social?.phone && (
                <a
                  href={`tel:${social.phone}`}
                  className="flex items-center gap-2"
                >
                  <Phone />
                  <p className="text-[#F6F6F6] text-sm font-medium" dir="ltr">
                    {social.phone}
                  </p>
                </a>
              )}

              {social?.email && (
                <a
                  href={`mailto:${social.email}`}
                  className="flex items-center gap-2"
                >
                  <Email />
                  <p className="text-[#F6F6F6] text-sm font-medium">
                    {social.email}
                  </p>
                </a>
              )}
                {social?.location && (
                  <a
                    href={`https://www.google.com/maps?q=${social.location.lat},${social.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Clover />
                    <p className="text-[#F6F6F6] text-sm font-medium">
                      {social?.details}
                    </p>
                  </a>
                )}
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-[#FEFEFE] md:text-2xl text-sm font-medium leading-[100%]">
                {t("legal")}
              </h3>
              {pages.map((page) => (
                <Link
                  key={page.id}
                  to={`/page/${page.id}`}
                  className="text-[#FEFEFE] md:text-sm text-xs font-semibold"
                >
                  {page.title[i18n.language as "en" | "ar"]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="md:mt-20 mt-10 flex flex-col items-center">
          <p className="text-[#F6F6F6] md:text-base text-[8px] font-medium leading-[100%]">
            {t("copyright")}
          </p>
          <div className="flex items-center mt-4">
            <Strip />
            <Amex />
            <Mastercard />
            <GooglePay />
            <Visa />
            <ApplePay />
            {/* <Tabby /> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
