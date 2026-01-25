import MobileBackHeader from "@/components/general/MobileBackHeader";
import Card from "@/components/home/GlassCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
    return (
        <section className="container">
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold mb-8 md:block hidden">
            My Wishlist
        </h1>

        <Link to='/' className="md:hidden flex items-center gap-3">
            <MobileBackHeader />
            <p className="text-[#0B0B0B] text-base font-semibold mb-6">
                Favorite
            </p>
        </Link>

        <div className="grid md:grid-cols-3 grid-cols-2 gap-8">
            <Card
            image="/images/home/glass_41.png"
            showHeart
            height="258px"
            />
        </div>
        </section>
    );
};

export default Wishlist;
