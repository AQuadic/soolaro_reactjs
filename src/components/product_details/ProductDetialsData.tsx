import { useTranslation } from "react-i18next";
import EmptyStar from "../icons/product/EmptyStar"
import FullStar from "../icons/product/FullStar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const ProductDetialsData = () => {
    const { t } = useTranslation("product");
    return (
        <section className="container">
            <div className="md:mt-17 mt-6">
                <Tabs defaultValue="description">
                    <TabsList className="bg-transparent flex lg:mb-8 mb-4 md:gap-4 w-full overflow-x-auto justify-start gap-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                        <TabsTrigger
                            value="description"
                            className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
                            >
                            {t('description')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="measurement"
                            className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
                            >
                            {t('measurement')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="shipping"
                            className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
                            >
                            {t('shipping')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="data-[state=active]:border-b-[#018884] rounded-none data-[state=active]:shadow-none bg-transparent data-[state=active]:text-[#025D5B] text-base font-bold text-[#3B3B3B] md:px-8 py-4"
                            >
                            {t('reviews')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="text-[#3B3B3B] text-base font-semibold leading-[150%]">
                        Crafted from high–quality materials, these sunglasses are designed to deliver both style and durability. Each pair features lightweight yet sturdy frames for all–day comfort, along with premium lenses that provide full UV400 protection against harmful rays. Whether you’re driving, chilling on the beach, or exploring the city, these shades are built to resist scratches, reduce glare, and keep your eyes safe while giving you a modern, confident look. A perfect blend of fashion and function — made to last and made for you.
                    </TabsContent>
                    <TabsContent value="measurement">
                        <ul className="list-disc px-10">
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">Lens Width: 52 mm</li>
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">Bridge Width: 18 mm</li>
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">Temple Length: 140 mm</li>
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">Lens Height: 45 mm</li>
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">Frame Width: 140 mm</li>
                        </ul>
                    </TabsContent>
                    <TabsContent value="shipping">
                        <ul className="list-disc px-10">
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                                Shipping
                                <p className="text-[#3B3B3B] text-base font-medium -mx-7.5">Final shipping fees are calculated at checkout based on weight and location. Please note that import duties and taxes may be charged on delivery</p>
                            </li>
                            <li className="text-[#3B3B3B] text-base font-semibold leading-[150%] mt-1">
                                Returns
                                <p className="text-[#3B3B3B] text-base font-medium -mx-7.5">If something is not quite right send your glasses back for a full refund.</p>
                            </li>
                        </ul>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <div className="flex lg:flex-row flex-col gap-8">
                            <div className="w-full h-full p-6 border border-[#DEDDDD] rounded-4xl">
                                <p className="text-[#0B0B0B] text-xl font-medium">
                                    Submit your review
                                </p>
                                <div className="mt-7 flex items-center justify-between">
                                    <h2 className="text-[#000000] text-base font-bold">
                                        Add your rate
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <EmptyStar />
                                        <EmptyStar />
                                        <EmptyStar />
                                        <EmptyStar />
                                        <EmptyStar />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="name" className="text-[#0B0B0B] text-base font-semibold">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full h-14 border border-[#DEDDDD] rounded-[20px] mt-3 px-4"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="name" className="text-[#0B0B0B] text-base font-semibold">
                                        Review
                                    </label>
                                    <textarea
                                        name="review"
                                        className="w-full md:h-[113px] h-18.25 border border-[#DEDDDD] rounded-4xl mt-3"
                                    >
                                    </textarea>
                                </div>

                                <button className="w-full h-14 bg-[#018884] rounded-4xl mt-6 text-[#FEFEFE] text-lg font-bold">
                                    Send Review
                                </button>
                            </div>

                            <div className="w-full h-full md:px-6 md:py-8 md:bg-[#F6F6F6] rounded-4xl">
                                <h2 className="text-[#0B0B0B] md:text-xl text-base font-medium">
                                    Average Rating
                                </h2>
                                <div className="flex items-center gap-3 mt-4">
                                    <p className="text-[#000000] md:text-lg text-sm font-medium">4.8</p>
                                    <div className="flex items-center">
                                        <FullStar />
                                        <FullStar />
                                        <FullStar />
                                        <FullStar />
                                        <FullStar />
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <a href="#" className="text-[#000000] text-sm font-medium text-fg-brand hover:underline">5</a>
                                    <div className="w-full md:h-2 h-1 mx-4 bg-[#EAE9E9] rounded-base rounded-4xl">
                                        <div className="md:h-2 h-1 bg-[#018884] rounded-base w-[70%] rounded-4xl"></div>
                                    </div>
                                    <span className="text-[#000000] text-sm font-medium text-body">70%</span>
                                </div>

                                <div className="flex items-center mt-4">
                                    <a href="#" className="text-[#000000] text-sm font-medium text-fg-brand hover:underline">4</a>
                                    <div className="w-full md:h-2 h-1 mx-4 bg-[#EAE9E9] rounded-base rounded-4xl">
                                        <div className="md:h-2 h-1 bg-[#018884] rounded-base w-[50%] rounded-4xl"></div>
                                    </div>
                                    <span className="text-[#000000] text-sm font-medium text-body">50%</span>
                                </div>

                                <div className="flex items-center mt-4">
                                    <a href="#" className="text-[#000000] text-sm font-medium text-fg-brand hover:underline">3</a>
                                    <div className="w-full md:h-2 h-1 mx-4 bg-[#EAE9E9] rounded-base rounded-4xl">
                                        <div className="md:h-2 h-1 bg-[#018884] rounded-base w-[30%] rounded-4xl"></div>
                                    </div>
                                    <span className="text-[#000000] text-sm font-medium text-body">30%</span>
                                </div>

                                <div className="flex items-center mt-4">
                                    <a href="#" className="text-[#000000] text-sm font-medium text-fg-brand hover:underline">2</a>
                                    <div className="w-full md:h-2 h-1 mx-4 bg-[#EAE9E9] rounded-base rounded-4xl">
                                        <div className="md:h-2 h-1 bg-[#018884] rounded-base w-[0%] rounded-4xl"></div>
                                    </div>
                                    <span className="text-[#000000] text-sm font-medium text-body">0%</span>
                                </div>

                            </div>
                        </div>
                        <div className="md:mt-10 mt-6">
                            <h2 className="text-[#0B0B0B] md:text-[40px] text-xl font-semibold">
                                Customer Reviews
                            </h2>
                            <div className="w-full border border-[#DEDDDD] rounded-4xl md:mt-10 mt-8 p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[#3B3B3B] md:text-base text-xs font-medium">Alaa Khamis</h3>
                                    <p className="text-[#3B3B3B] md:text-sm text-xs font-medium">19 Jun 2026</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FullStar />
                                    <FullStar />
                                    <FullStar />
                                    <FullStar />
                                    <FullStar />
                                </div>
                                <p className="text-[#0B0B0B] md:text-lg text-sm font-medium leading-[150%] mt-3.5">
                                    I really like these sunglasses. They are comfortable to wear for long hours, fit perfectly, and block sunlight really well. The design is stylish and goes with almost any outfit. Definitely worth buying!”
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
        </div>
        </section>
    )
}

export default ProductDetialsData
