import type { Order } from "@/lib/api/profile/singleOrder";
import { useTranslation } from "react-i18next";

interface Props {
    order: Order;
}

const OrderSummary = ({ order }: Props) => {
    const { t, i18n } = useTranslation("profile");

    return (
        <section className="md:my-8 my-4">
            <h2 className="text-[#3B3B3B] md:text-2xl text-lg font-semibold">
                {t("order_details.order_summary")}
            </h2>

            {order.orderItems?.map((item) => (
                <div
                    key={item.id}
                    className="md:mt-8 mt-6 p-3 border border-[#DEDDDD] rounded-[20px] flex gap-4"
                >
                    <div className="md:w-[126px] w-[86px] md:h-[126px] h-[86px] bg-[#F6F6F6] rounded-[8px] overflow-hidden">
                        <img
                            src={item.productable?.image?.url}
                            alt={
                                i18n.language === "ar"
                                    ? item.product_name.ar
                                    : item.product_name.en
                            }
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div>
                        <p className="text-[#0B0B0B] md:text-sm text-[8px] font-normal">
                            {t("order_details.order_number")} <span>#{order.id}</span>
                        </p>

                        <h3 className="text-[#0B0B0B] md:text-lg text-sm font-medium md:mt-2">
                            {i18n.language === "ar"
                                ? item.product_name.ar
                                : item.product_name.en}
                        </h3>

                        <div className="flex items-center md:mt-2">
                            <h3 className="text-[#0B0B0B] md:text-xl text-base font-semibold">
                                {item.price}
                            </h3>
                            <img
                                src="/images/currency.png"
                                alt="currency"
                                className="w-9 h-9"
                            />
                        </div>
                        {order.orderItems[0]?.variant?.attributes?.map((attr) => {
                            if (attr.attribute.type === "Color") {
                                return (
                                    <div key={attr.id} className="md:mt-2 flex items-center gap-1">
                                        <h3 className="text-[#0B0B0B] md:text-base text-xs font-semibold">
                                            {t("order_details.color")}:
                                        </h3>
                                        <div
                                            className="w-6 h-6 rounded-full border border-gray-200"
                                            style={{ backgroundColor: attr.value.special_value }}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ))}

            {/* Delivered */}
            {order.delivered_at && (
                <div className="md:mt-8 mt-6 p-3 border border-[#DEDDDD] rounded-[20px]">
                    <p className="text-[#0B0B0B] md:text-lg text-xs font-medium">
                        {t('order_details.delivered')}
                    </p>
                    <h3 className="text-[#0B0B0B] md:text-xl text-sm font-semibold mt-1">
                        {t("on")} {new Date(order.delivered_at).toDateString()}
                    </h3>
                </div>
            )}

            {/* Order Summary */}
            <div className="md:mt-8 mt-6 p-3 border border-[#DEDDDD] rounded-[20px]">
                <p className="text-[#0B0B0B] md:text-xl text-lg font-medium">
                    {t("order_details.order_summary")}
                </p>
                <div className="md:mt-4 mt-2 flex justify-between">
                    <h3 className="text-[#0B0B0B] md:text-base text-xs font-normal">
                        {t("order_details.subtotal")}:
                    </h3>
                    <h3 className="text-[#0B0B0B] md:text-base text-xs font-medium flex items-center">
                        {order.sub_total}
                        <img
                            src="/images/currency.png"
                            alt="currency"
                            className="w-6 h-6 inline-block ml-1"
                        />
                    </h3>
                </div>

                <div className="md:mt-4 mt-2 flex justify-between">
                    <h3 className="text-[#0B0B0B] md:text-base text-sm font-normal">
                        {t("order_details.shipping_cost")}:
                    </h3>
                    <h3 className="text-[#0B0B0B] md:text-base text-sm font-medium flex items-center">
                        {order.shipping}
                        <img
                            src="/images/currency.png"
                            alt="currency"
                            className="w-6 h-6 inline-block ml-1"
                        />
                    </h3>
                </div>

                <div className="md:mt-4 mt-2 flex justify-between">
                    <h3 className="text-[#0B0B0B] md:text-base text-sm font-normal">
                        {t("order_details.tax")}:
                    </h3>
                    <h3 className="text-[#0B0B0B] md:text-base text-sm font-medium flex items-center">
                        {order.tax}
                        <img
                            src="/images/currency.png"
                            alt="currency"
                            className="w-6 h-6 inline-block ml-1"
                        />
                    </h3>
                </div>

                {order.total_discount > 0 && (
                    <div className="md:mt-4 mt-2 flex justify-between">
                        <h3 className="text-[#0B0B0B] md:text-base text-sm font-normal">
                            {t("order_details.discount")}:
                        </h3>
                        <h3 className="text-red-500 md:text-base text-sm font-medium flex items-center">
                            -{order.total_discount}
                            <img
                                src="/images/currency.png"
                                alt="currency"
                                className="w-6 h-6 inline-block ml-1"
                            />
                        </h3>
                    </div>
                )}

                <div className="mt-2 flex justify-between pt-4 border-t border-[#DEDDDD]">
                    <h3 className="text-[#0B0B0B] md:text-lg text-sm font-semibold">
                        {t("order_details.total")}:
                    </h3>
                    <h3 className="text-[#025D5B] md:text-xl text-base font-bold flex items-center">
                        {order.total}
                        <img
                            src="/images/c_currency.png"
                            alt="currency"
                            className="w-7 h-6 inline-block ml-1"
                        />
                    </h3>
                </div>
            </div>

            {order.address_details && (
                <div className="md:mt-8 mt-6 p-3 border border-[#DEDDDD] rounded-[20px]">
                    <p className="text-[#0B0B0B] md:text-xl text-lg font-medium">
                        {t("order_details.delivery_information")}
                    </p>
                    <h3 className="text-[#0B0B0B] md:text-base text-sm font-medium mt-1">
                        {order.address_details}
                    </h3>
                </div>
            )}

            <div className="md:mt-8 mt-6 p-3 border border-[#DEDDDD] rounded-[20px]">
                <p className="text-[#0B0B0B] md:text-xl text-lg font-medium">
                    {t("order_details.phone_number")}
                </p>
                <h3 className="text-[#0B0B0B] md:text-base text-sm font-medium mt-1 rtl:text-right ltr:text-left" dir="ltr">
                    {order.phone_national}
                </h3>
            </div>
        </section>
    )
}

export default OrderSummary
