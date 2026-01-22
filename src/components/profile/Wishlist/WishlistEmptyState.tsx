import { Link } from "react-router-dom"

const WhishlistEmptyState = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-6">
            <img
                src="/images/profile/wishlist_heart.gif"
                alt="order empty state"
            />
            <p className="text-[#3B3B3B] text-lg font-medium">
                Tap the heart to save your favorite items
            </p>

            <Link to='/explore' className="w-full h-14 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold flex items-center justify-center">
                Explore Shop
            </Link>
        </section>
    )
}

export default WhishlistEmptyState
