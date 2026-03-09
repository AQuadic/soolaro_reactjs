import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "@/components/icons/explore/BackArrow";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { trackOrderById } from "@/lib/api/profile/singleOrder";

const TrackOrder = () => {
    const { t } = useTranslation("profile");
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleTrack = async () => {
        if (!orderId) {
            toast.error(t("please_enter_order_id"));
            return;
        }
        if (!email && !phone) {
            toast.error(t("please_enter_email_or_phone"));
            return;
        }

        try {
            await trackOrderById(orderId, email, phone);

            navigate(`/track_order/track_order_details/${orderId}`, {
                state: { email, phone },
            });
        } catch (error: any) {
            const message = error?.response?.data?.message || t("something_went_wrong");
            toast.error(message);
        }
    };
    return (
        <section className="py-12 container">
            <div className="md:hidden flex items-center gap-3 py-6">
                <Link
                    to=""
                    className="w-12 h-12 rounded-full bg-[#F6F6F6] flex items-center justify-center"
                >
                    <BackArrow />
                </Link>

                <p className="text-[#0B0B0B] text-base font-semibold">
                    {t("track_order_with_id")}
                </p>
            </div>

            <img
                src="/images/box.gif"
                alt={t("tracking_order")}
                className="mx-auto md:w-[284px] w-[217px] md:h-[284px] h-[217px]"
            />

            <h2 className="text-[#0B0B0B] text-[40px] font-semibold mt-12 md:flex hidden">
                {t("track_order_with_id")}
            </h2>

            <div className="md:mt-12 mt-3 flex flex-col gap-3">
                <label className="text-[#0B0B0B] md:text-base text-sm md:font-semibold font-medium">
                    {t("order_id")}
                </label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full h-14 border border-[#DEDDDD] rounded-[20px] px-3"
                    placeholder={t("enter_order_id")}
                />

                <label className="text-[#0B0B0B] md:text-base text-sm md:font-semibold font-medium">
                    {t("email")}
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 border border-[#DEDDDD] rounded-[20px] px-3"
                    placeholder={t("enter_email")}
                />

                <label className="text-[#0B0B0B] md:text-base text-sm md:font-semibold font-medium">
                    {t("phone")}
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-14 border border-[#DEDDDD] rounded-[20px] px-3"
                    placeholder={t("enter_phone")}
                />

                <button
                    onClick={handleTrack}
                    className="w-full h-14 bg-[#018884] rounded-[20px] text-[#FEFEFE] md:text-lg text-base md:font-bold font-semibold md:mt-8 mt-3"
                >
                    {t("track")}
                </button>
            </div>
        </section>
    )
};

export default TrackOrder;