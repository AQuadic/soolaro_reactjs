import { Link, useNavigate } from "react-router-dom";
import MobileBackHeader from "../general/MobileBackHeader";
import User from "../icons/header/User";
import MyOrders from "../icons/profile/MyOrders";
import MyWishlist from "../icons/profile/MyWishlist";
import MyAddresses from "../icons/profile/MyAddresses";
import Logout from "../icons/profile/Logout";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileMobileView = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <section className="mb-12">
      <Link to="/" className="flex items-center gap-3">
        <MobileBackHeader />
        <p className="text-[#0B0B0B] text-base font-semibold mb-6">Profile</p>
      </Link>
      <div className="mt-4">
        <Link
          to="/profile/info"
          className="w-full h-12 bg-[#F6F6F6] rounded-4xl flex items-center gap-2 px-3 py-4"
        >
          <User />
          <p className="text-[#0B0B0B] text-base font-medium">My profile</p>
        </Link>

        <Link
          to="/profile/orders"
          className="w-full h-12 bg-[#F6F6F6] rounded-4xl flex items-center gap-2 px-3 py-4 mt-6"
        >
          <MyOrders />
          <p className="text-[#0B0B0B] text-base font-medium">My Orders</p>
        </Link>

        <Link
          to="/profile/wishlist"
          className="w-full h-12 bg-[#F6F6F6] rounded-4xl flex items-center gap-2 px-3 py-4 mt-6"
        >
          <MyWishlist />
          <p className="text-[#0B0B0B] text-base font-medium">My Wishlist</p>
        </Link>

        <Link
          to="/profile/addresses"
          className="w-full h-12 bg-[#F6F6F6] rounded-4xl flex items-center gap-2 px-3 py-4 mt-6"
        >
          <MyAddresses />
          <p className="text-[#0B0B0B] text-base font-medium">My Addresses</p>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full h-12 bg-[#F6F6F6] rounded-4xl flex items-center gap-2 px-3 py-4 mt-6"
        >
          <Logout />
          <p className="text-[#CA1010] text-base font-medium">Log Out</p>
        </button>
      </div>
    </section>
  );
};

export default ProfileMobileView;
