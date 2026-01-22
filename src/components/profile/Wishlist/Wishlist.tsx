import Card from "@/components/home/GlassCard";

const Wishlist = () => {
    return (
        <section className="container">
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold mb-8">
            My Wishlist
        </h1>

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
