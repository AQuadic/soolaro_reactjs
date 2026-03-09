import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { trackOrderById, type Order } from "@/lib/api/profile/singleOrder";
import OrderStatus from "@/components/profile/orders/order_details/OrderStatus";
import OrderSummary from "@/components/profile/orders/order_details/OrderSummary";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const TrackOrderDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { email, phone } = location.state || {};

    const { data: order, isLoading, isError } = useQuery<Order>({
        queryKey: ["order", id, email, phone],
        queryFn: async () => {
            try {
                return await trackOrderById(id!, email, phone);
            } catch (err: any) {
                toast.error(err?.response?.data?.message || "Order not found");
                throw err;
            }
        },
        enabled: !!id && (!!email || !!phone),
    });

    if (isLoading) {
        return (
            <div className="space-y-6 py-6 container">
                <div className="md:hidden flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex items-center gap-3 bg-[#F6F6F6] p-4 rounded-[8px]">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                </div>
                {[1, 2].map((item) => (
                    <div
                        key={item}
                        className="flex gap-4 p-4 border rounded-[20px]"
                    >
                        <Skeleton className="w-[100px] h-[100px] rounded-[8px]" />

                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                ))}
                <div className="p-4 border rounded-[20px] space-y-4">
                    <Skeleton className="h-5 w-32" />

                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>

                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>

                    <div className="flex justify-between pt-4">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                </div>
                <div className="p-4 border rounded-[20px] space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="p-4 border rounded-[20px] space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
        );
    }
    if (isError || !order) return <p>Order not found</p>;

    return (
        <section className="container py-10">
            <OrderStatus order={order} />
            <OrderSummary order={order} />
        </section>
    );
};

export default TrackOrderDetailsPage;