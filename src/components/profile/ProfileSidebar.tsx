import { NavLink, useNavigate } from "react-router-dom";

import User from "../icons/header/User";

import MyOrders from "../icons/profile/MyOrders";

import MyWishlist from "../icons/profile/MyWishlist";

import MyAddresses from "../icons/profile/MyAddresses";

import Logout from "../icons/profile/Logout";
import ActiveMyProfile from "../icons/profile/ActiveMyProfile";
import ActiveOrders from "../icons/profile/ActiveOrders";
import ActiveWishList from "../icons/profile/ActiveWishList";
import ActiveAddresses from "../icons/profile/ActiveAddresses";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Image } from "@/components/ui/image";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileSidebar = () => {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const menu = [
    {
      label: t("myProfile"),
      path: "/profile/info",
      icon: <User />,
      activeIcon: <ActiveMyProfile />,
      danger: false,
    },
    {
      label: t("myOrders"),
      path: "/profile/orders",
      icon: <MyOrders />,
      activeIcon: <ActiveOrders />,
      danger: false,
    },
    {
      label: t("myWishlist"),
      path: "/profile/wishlist",
      icon: <MyWishlist />,
      activeIcon: <ActiveWishList />,
      danger: false,
    },
    {
      label: t("myAddresses"),
      path: "/profile/addresses",
      icon: <MyAddresses />,
      activeIcon: <ActiveAddresses />,
      danger: false,
    },
  ];

  return (
    <div className="space-y-8">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="flex items-center gap-2"
        >
          {({ isActive }) => (
            <>
              {isActive ? item.activeIcon : item.icon}
              <p
                className={`text-xl font-medium leading-[100%] ${
                  isActive ? "text-[#025D5B]" : "text-[#0B0B0B]"
                }`}
              >
                {item.label}
              </p>
            </>
          )}
        </NavLink>
      ))}

      <Dialog>
        <DialogTrigger className="w-full">
          <button className="flex items-center gap-2 mt-8">
            <Logout />
            <p className="text-[#CA1010] text-xl font-medium leading-[100%]">
              {t("logOut")}
            </p>
          </button>
        </DialogTrigger>
        <DialogContent className="md:w-[655px] flex flex-col items-center justify-end">
          <DialogHeader>
            <Image
              src="/images/profile/logout.gif"
              alt="logout"
              className="md:w-[267px] w-[136px] md:h-[267px] h-[136px] mx-auto"
            />
            <DialogTitle className="text-[#0B0B0B] md:text-2xl text-base font-semibold text-center">
              {t("logOutConfirmTitle")}
            </DialogTitle>
            <DialogDescription className="text-[#3B3B3B] md:text-base text-xs font-medium">
              {t("logOutConfirmDesc")}
            </DialogDescription>
            <DialogFooter className="flex flex-row md:mt-0 mt-4">
              <DialogClose asChild>
                <button
                  type="button"
                  className="w-full h-14 border border-[#DEDDDD] rounded-4xl md:mt-8 text-[#3B3B3B] text-base font-bold"
                >
                  {t("cancel")}
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full h-14 bg-[#018884] rounded-4xl md:mt-8 text-[#FEFEFE] text-base font-bold"
              >
                {t("logOut")}
              </button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSidebar;
