import { Link } from "react-router-dom";
import BreadCrumbs from "../general/BreadCrumbs";
import BackArrow from "../icons/explore/BackArrow";
import { useTranslation } from "react-i18next";

const FaqHeader = () => {
    const { t } = useTranslation("faq");

    const breadcrumbItems = [
        { nameEn: "Home", nameAr: t("breadcrumbs.home"), Link: "/" },
        { nameEn: "FAQs", nameAr: t("breadcrumbs.faqs"), Link: "/" },
    ];
    return (
        <section className="container">
            <BreadCrumbs items={breadcrumbItems} hideOnMobile={true} />
            <Link to='/' className="w-12 h-12 rounded-full bg-[#F6F6F6] md:hidden flex items-center justify-center">
                <BackArrow />
            </Link>
            <div className="md:mt-12 mt-10 flex flex-col items-center justify-center gap-9">
                <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-semibold">
            {t("title")}
                </h2>
                <p className="text-[#3B3B3B] md:text-xl text-sm font-medium text-center">
                {t("description")}
                </p>
            </div>
        </section>
    )
}

export default FaqHeader
