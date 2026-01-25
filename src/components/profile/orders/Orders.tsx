import OrderAgain from "@/components/icons/profile/OrderAgain";
import { Image } from "@/components/ui/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderEmptyState from "./OrderEmptyState";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";

const Orders = () => {
  return (
    <section>
      <h1 className="text-[#0B0B0B] text-[40px] font-semibold leading-[100%] md:block hidden">
        My Orders
      </h1>

      <Link to="/" className="md:hidden flex items-center gap-3">
        <MobileBackHeader />
        <p className="text-[#0B0B0B] text-base font-semibold mb-6">My orders</p>
      </Link>

      <div className="md:mt-8 mt-4 mb-12">
        <Tabs defaultValue="current">
          <TabsList className="bg-[#F6F6F6] flex flex-wrap mb-8 md:gap-4 w-full py-6">
            <TabsTrigger
              value="current"
              className="data-[state=active]:bg-[#018884] data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#FEFEFE] text-base font-medium text-[#3B3B3B] md:px-8 py-4 rounded-[12px] -mt-4.25"
            >
              Current Orders
            </TabsTrigger>
            <TabsTrigger
              value="last"
              className="data-[state=active]:bg-[#018884] data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#FEFEFE] text-base font-medium text-[#3B3B3B] md:px-8 py-4 rounded-[12px] -mt-4.25"
            >
              Last Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="current"
            className="text-[#3B3B3B] text-base font-semibold leading-[150%]"
          >
            {/* <div className="w-full h-full border border-[#DEDDDD] p-3 rounded-4xl flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="md:w-21 w-14 md:h-21 h-14 bg-[#F6F6F6] rounded-xl flex items-center justify-center">
                                        <img
                                            src="/images/home/glass4.png"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-[#0B0B0B] md:text-lg text-xs font-medium">
                                            Liwa-Black
                                        </h2>
                                        <h2 className="text-[#0B0B0B] md:text-xl text-sm font-semibold md:mt-1.5 mt-1">
                                            269.00
                                        </h2>
                                        <p className="text-[#3B3B3B] md:text-xs text-[8px] font-medium mt-1.5">
                                            20 jun 2026
                                        </p>
                                    </div>
                                </div>
                                <div className="p-2 h-7.5 bg-[#F6F6F6] rounded-xl text-[#3B3B3B] text-sm font-medium flex items-center justify-center">
                                    Pending
                                </div>
                            </div> */}
            <OrderEmptyState />
          </TabsContent>
          <TabsContent value="last">
            <div>
              <div className="w-full h-full border border-[#DEDDDD] p-3 rounded-4xl flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="md:w-21 w-14 md:h-21 h-14 bg-[#F6F6F6] rounded-xl flex items-center justify-center">
                    <Image
                      src="/images/home/glass4.png"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-[#0B0B0B] md:text-lg text-xs font-medium">
                      Liwa-Black
                    </h2>
                    <h2 className="text-[#0B0B0B] md:text-xl text-sm font-semibold md:mt-1.5 mt-1">
                      269.00
                    </h2>
                    <p className="text-[#3B3B3B] md:text-xs text-[8px] font-medium mt-1.5">
                      20 jun 2026
                    </p>
                  </div>
                </div>
                <div className="p-2 h-7.5 bg-[#F6F6F6] rounded-xl text-[#3B3B3B] text-sm font-medium flex items-center justify-center">
                  Pending
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <OrderAgain />
                <p className="text-[#018884] text-lg font-semibold">
                  Order Again
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Orders;
