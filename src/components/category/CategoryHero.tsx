import Header from "../general/Header";

const CategoryHero = () => {
    return (
        <section
        className="w-full md:h-127.5 h-53.75 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/category/category_hero.jpg')" }}
        >
        <Header className="absolute top-0 left-0 w-full z-10" />

        </section>
    );
};

export default CategoryHero;
