const ShopByCategory = () => {
    return (
        <section className="md:py-17 py-10 container">
            <h2 className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold">
                Shop by category
            </h2>

            <div className="md:mt-12 mt-6">
                <div className="flex gap-8">
                    <div className="relative">
                        <img
                            src="/images/home/best.jpg"
                            alt="best seller"
                            className="md:w-171.75 w-40 md:h-107 h-35.25 bg-[#0000001A] opacity-70 rounded-4xl object-cover"
                        />
                        <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold leading-[100%] absolute md:top-6 top-3 md:right-6 right-2">
                            Best seller
                        </h2>
                    </div>
                    <div className="relative">
                        <img
                            src="/images/home/new.jpg"
                            alt="new"
                            className="md:w-120.25 w-40 md:h-107 h-35.25 bg-[#0000001A] opacity-70 rounded-4xl object-cover"
                        />
                        <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold leading-[100%] absolute md:bottom-6 bottom-3 md:left-6 left-2">
                            New Arrival
                        </h2>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="/images/home/summer.jpg"
                        alt="summer collection"
                        className="w-full md:h-107 h-39.5 bg-[#0000001A] opacity-70 rounded-4xl object-cover md:mt-10 mt-4"
                    />
                    <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold leading-[100%] absolute md:top-6 top-3 md:left-6 left-2">
                        Summer collection
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default ShopByCategory
