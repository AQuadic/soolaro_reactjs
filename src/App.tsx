import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import ExploreProductsPage from "./pages/ExploreProductsPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SigninPage from "./pages/auth/SigninPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import OtpPage from "./pages/auth/OtpPage";
import NewPasswordPage from "./pages/auth/NewPasswordPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/MyProfile";
import ProfileInfo from "./components/profile/ProfileInfo";
import Orders from "./components/profile/orders/Orders";
import Wishlist from "./components/profile/Wishlist/Wishlist";
import Addresses from "./components/profile/Addresses/Addresses";
import ChangePassword from "./components/profile/change_password/ChangePassword";
import FAQPage from "./pages/FAQPage";
import ContactUsPage from "./pages/ContactUsPage";
import AddNewAddress from "./components/profile/Addresses/AddNewAddress";
import EditAddress from "./components/profile/Addresses/EditAddress";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import PageDetail from "./pages/PageDetail";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<ExploreProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product_details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact_us" element={<ContactUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/page/:id" element={<PageDetail />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route path="info" element={<ProfileInfo />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="change_password" element={<ChangePassword />} />
              <Route path="add_address" element={<AddNewAddress />} />
              <Route path="edit_address" element={<EditAddress />} />
            </Route>
          </Route>

          <Route path="/category" element={<Layout hideHeader={true} />}>
            <Route index element={<CategoryPage />} />
          </Route>

          <Route>
            <Route
              path="signin"
              element={
                <GuestRoute>
                  <SigninPage />
                </GuestRoute>
              }
            />
            <Route
              path="signup"
              element={
                <GuestRoute>
                  <SignUpPage />
                </GuestRoute>
              }
            />
            <Route
              path="forget_password"
              element={
                <GuestRoute>
                  <ForgetPasswordPage />
                </GuestRoute>
              }
            />
            <Route
              path="otp"
              element={
                <GuestRoute>
                  <OtpPage />
                </GuestRoute>
              }
            />
            <Route
              path="new_password"
              element={
                <GuestRoute>
                  <NewPasswordPage />
                </GuestRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
