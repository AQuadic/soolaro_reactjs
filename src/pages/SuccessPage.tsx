import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("header");

  const orderCode = location.state?.orderCode;

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-[719px] w-full p-8 md:p-12 shadow-lg">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Icon */}
          <div className="w-[213px] h-[213px]">
            <img
              src="/images/checkout/success.gif"
              alt={t("checkout.success.alt")}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-10 w-full">
            {/* Text Section */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-semibold text-[#0B0B0B] text-center font-quicksand">
                {t("checkout.success.title")}
              </h1>
              <p className="text-base font-medium text-[#0B0B0B] text-center font-quicksand">
                {t("checkout.success.description")}
              </p>

              {orderCode && (
                <p className="text-base font-medium text-[#0B0B0B] text-center font-quicksand">
                  {t('checkout.success.order_id')}{" "}
                  <span className="font-bold">#{orderCode}</span>
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
              <button
                onClick={() => navigate("/profile/orders")}
                className="w-full md:w-[316px] h-14 rounded-[20px] border border-[#018884] text-[#018884] font-bold text-lg flex items-center justify-center hover:bg-[#018884] hover:text-white transition-colors duration-300 font-quicksand"
              >
                {t("checkout.success.viewOrder")}
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full md:w-[315px] h-14 rounded-[20px] bg-[#018884] text-white font-bold text-lg flex items-center justify-center hover:bg-[#016663] transition-colors duration-300 font-quicksand"
              >
                {t("checkout.success.continueShopping")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
