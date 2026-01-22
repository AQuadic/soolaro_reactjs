const OrderEmptyState = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-6">
            <img
                src="/images/profile/order_emptystate.gif"
                alt="order empty state"
            />
            <p className="text-[#3B3B3B] text-lg font-medium">
                You haven’t placed any orders yet
            </p>

            <button className="w-full h-14 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold">
                Explore Shop
            </button>
        </section>
    )
}

export default OrderEmptyState
