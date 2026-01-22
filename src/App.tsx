import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import ExploreProductsPage from "./pages/ExploreProductsPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import OtpPage from "./pages/OtpPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/MyProfile";
import ProfileInfo from "./components/profile/ProfileInfo";
import Orders from "./components/profile/orders/Orders";
import Wishlist from "./components/profile/Wishlist/Wishlist";
import Addresses from "./components/profile/Addresses/Addresses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/explore" element={<ExploreProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product_details" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<ProfileInfo />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>

        <Route path="/category" element={<Layout hideHeader={true} />}>
          <Route index element={<CategoryPage />} />
        </Route>

        <Route>
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forget_password" element={<ForgetPasswordPage />} />
            <Route path="otp" element={<OtpPage />} />
            <Route path="new_password" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
