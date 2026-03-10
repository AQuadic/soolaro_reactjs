import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CopyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 11C6 8.172 6 6.757 6.879 5.879C7.757 5 9.172 5 12 5H15C17.828 5 19.243 5 20.121 5.879C21 6.757 21 8.172 21 11V16C21 18.828 21 20.243 20.121 21.121C19.243 22 17.828 22 15 22H12C9.172 22 7.757 22 6.879 21.121C6 20.243 6 18.828 6 16V11Z"
      stroke="#018884"
      strokeWidth="1.5"
    />
    <path
      d="M6 19C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H15C15.7956 2 16.5587 2.31607 17.1213 2.87868C17.6839 3.44129 18 4.20435 18 5"
      stroke="#018884"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12L10 17L19 7"
      stroke="#018884"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("header");
  const [copied, setCopied] = useState(false);

  const orderCode = location.state?.orderCode;
  // Read order-id from URL query params (e.g. ?order-id=11)
  const orderId = searchParams.get("order-id");

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
              {/* Order ID from URL query param */}
              {orderId && (
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                  <span className="text-sm font-bold text-[#0B0B0B] font-quicksand">
                    Order ID : #{orderId}
                  </span>
                  <button
                    onClick={() => handleCopy(orderId)}
                    title="Copy order ID"
                    className="flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              )}
              <p className="text-base font-medium text-[#0B0B0B] text-center font-quicksand">
                {t("checkout.success.description")}
              </p>

              {/* Order ID from location state (legacy) */}
              {orderCode && !orderId && (
                <p className="text-base font-medium text-[#0B0B0B] text-center font-quicksand">
                  {t("checkout.success.order_id")}{" "}
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
