import OrderAgain from "@/components/icons/profile/OrderAgain";
import { Image } from "@/components/ui/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderEmptyState from "./OrderEmptyState";

import MobileBackHeader from "@/components/general/MobileBackHeader";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getOrders, type Order } from "@/lib/api/orders/getOrders";
import { formatDate } from "@/lib/utils/dateUtils";

const Orders = () => {
  const { t, i18n } = useTranslation("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders();
        setOrders(response.orders.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status
  // Current orders: everything except completed and cancelled
  const currentOrders = orders.filter(
    (order) => order.status !== "completed" && order.status !== "cancelled",
  );
  // Last orders: only completed and cancelled
  const lastOrders = orders.filter(
    (order) => order.status === "completed" || order.status === "cancelled",
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "preorder":
        return "bg-[#F3E8FF] text-[#A855F7]";
      case "pending":
        return "bg-[#FEF3E2] text-[#F59E0B]";
      case "confirmed":
        return "bg-[#DBEAFE] text-[#3B82F6]";
      case "ready_for_shipping":
        return "bg-[#E0E7FF] text-[#6366F1]";
      case "in_shipping":
        return "bg-[#DBEAFE] text-[#0EA5E9]";
      case "completed":
        return "bg-[#D1FAE5] text-[#10B981]";
      case "cancelled":
        return "bg-[#FEE2E2] text-[#EF4444]";
      default:
        return "bg-[#F6F6F6] text-[#3B3B3B]";
    }
  };

  // const capitalizeStatus = (status: string) => {
  //   // Convert snake_case to Title Case
  //   return status
  //     .split("_")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(" ");
  // };

  const renderOrderItem = (order: Order, showOrderAgain: boolean = false) => {
    // Get the first order item for display
    const firstItem = order.orderItems[0];
    const itemCount = order.orderItems.length;
    const productName =
      firstItem.product_name[currentLanguage as "en" | "ar"] ||
      firstItem.product_name.en;
    const itemImage =
      firstItem.variant.images[0]?.url || firstItem.productable.image.url;

    return (
      <div
        key={order.id}
        className="w-full h-full border border-[#DEDDDD] p-3 rounded-4xl flex justify-between mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="md:w-21 w-14 md:h-21 h-14 bg-[#F6F6F6] rounded-xl flex items-center justify-center overflow-hidden">
            <Image
              src={itemImage}
              alt={productName}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-[#0B0B0B] md:text-lg text-xs font-medium">
              {productName}
              {itemCount > 1 && (
                <span className="text-[#3B3B3B] md:text-sm text-[10px] ml-2">
                  +{itemCount - 1} more
                </span>
              )}
            </h2>
            <h2 className="text-[#0B0B0B] md:text-xl text-sm font-semibold md:mt-1.5 mt-1 flex items-center">
              {order.total.toFixed(2)}
              <img
                src="/images/currency.png"
                alt="currency"
                className="w-[22.5px] h-6"
              />
            </h2>
            <p className="text-[#3B3B3B] md:text-xs text-[8px] font-medium mt-1.5">
              {formatDate(
                order.created_at,
                currentLanguage === "ar" ? "ar-AE" : "en-US",
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div
            className={`px-3 py-1.5 h-fit rounded-xl text-sm font-medium flex items-center justify-center ${getStatusColor(order.status)}`}
          >
            {t(`order_status.${order.status.toLowerCase()}`)}
          </div>
          {showOrderAgain && (
            <button className="flex items-center gap-2 mt-2">
              <OrderAgain />
              <p className="text-[#018884] md:text-base text-xs font-semibold">
                {t("orderAgain")}
              </p>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section>
      <h1 className="text-[#0B0B0B] text-[40px] font-semibold leading-[100%] md:block hidden">
        {t("myOrders")}
      </h1>

      <MobileBackHeader title={t("myOrders")} link="/profile" />

      <div className="md:mt-8 mt-4 mb-12">
        <Tabs defaultValue="current">
          <TabsList
            className="bg-[#F6F6F6] flex flex-wrap mb-8 md:gap-4 w-full py-6"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <TabsTrigger
              value="current"
              className="data-[state=active]:bg-[#018884] data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#FEFEFE] text-base font-medium text-[#3B3B3B] md:px-8 py-4 rounded-[12px] -mt-4.25"
            >
              {t("currentOrders")}
            </TabsTrigger>
            <TabsTrigger
              value="last"
              className="data-[state=active]:bg-[#018884] data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#FEFEFE] text-base font-medium text-[#3B3B3B] md:px-8 py-4 rounded-[12px] -mt-4.25"
            >
              {t("lastOrders")}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="current"
            className="text-[#3B3B3B] text-base font-semibold leading-[150%]"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#018884]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : currentOrders.length === 0 ? (
              <OrderEmptyState />
            ) : (
              <div>
                {currentOrders.map((order) => renderOrderItem(order, false))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="last">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#018884]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : lastOrders.length === 0 ? (
              <OrderEmptyState />
            ) : (
              <div>
                {lastOrders.map((order) => renderOrderItem(order, true))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Orders;
