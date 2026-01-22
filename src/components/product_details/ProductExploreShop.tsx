import { Link } from "react-router-dom"

const ProductExploreShop = () => {
    return (
        <section
        className="relative md:my-17 my-8 md:h-136 h-67 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/product/explore.jpg')" }}
        >
        <div className="absolute inset-0 bg-[#00000066] opacity-60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end md:pb-10 pb-4">
            <h2 className="mb-6 text-[#FEFEFE] md:text-[40px] text-base font-semibold text-center">
            Timeless, Confident, Refined, Always Iconic.
            </h2>

            <Link to="/explore">
            <div className="md:w-103.25 w-85.75 h-12 bg-[#FFFFFF33] rounded-4xl flex items-center justify-center text-[#FEFEFE] text-lg font-bold">
                Explore Shop
            </div>
            </Link>
        </div>
        </section>
    )
}

export default ProductExploreShop
