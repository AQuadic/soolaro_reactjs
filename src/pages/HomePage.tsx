import BestSeller from "../components/home/BestSeller"
import ExploreShop from "../components/home/ExploreShop"
import HomeHero from "../components/home/HomeHero"
import NewArrival from "../components/home/NewArrival"
import ShopByCategory from "../components/home/ShopByCategory"

const HomePage = () => {
    return (
        <div>
            <HomeHero />
            <ShopByCategory />
            <NewArrival />
            <ExploreShop />
            <BestSeller />
        </div>
    )
}

export default HomePage
