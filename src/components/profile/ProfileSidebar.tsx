import { NavLink } from "react-router-dom"

import User from "../icons/header/User"

import MyOrders from "../icons/profile/MyOrders"

import MyWishlist from "../icons/profile/MyWishlist"

import MyAddresses from "../icons/profile/MyAddresses"

import Logout from "../icons/profile/Logout"
import ActiveMyProfile from "../icons/profile/ActiveMyProfile"
import ActiveOrders from "../icons/profile/ActiveOrders"
import ActiveWishList from "../icons/profile/ActiveWishList"
import ActiveAddresses from "../icons/profile/ActiveAddresses"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

const menu = [
  {
    label: "My Profile",
    path: "/profile",
    icon: <User />,
    activeIcon: <ActiveMyProfile />,
    danger: false,
  },
  {
    label: "My Orders",
    path: "/profile/orders",
    icon: <MyOrders />,
    activeIcon: <ActiveOrders />,
    danger: false,
  },
  {
    label: "My Wishlist",
    path: "/profile/wishlist",
    icon: <MyWishlist />,
    activeIcon: <ActiveWishList />,
    danger: false,
  },
  {
    label: "My Addresses",
    path: "/profile/addresses",
    icon: <MyAddresses />,
    activeIcon: <ActiveAddresses />,
    danger: false,
  },
]

const ProfileSidebar = () => {
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
                  Log Out
                  </p>
              </button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center justify-end">
                <DialogHeader>
                  <img
                    src="/images/profile/logout.gif"
                    alt="logout"
                    className="w-[267px] h-[267px] mx-auto"
                  />
                <DialogTitle className="text-[#0B0B0B] text-2xl font-semibold text-center">
                    Are you sure you want to log out?
                </DialogTitle>
                <DialogDescription className="text-[#3B3B3B] text-base font-medium">
                  You’ll need to sign in again to access your account.
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                    <button
                        type="button"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-8 text-[#3B3B3B] text-base font-bold"
                    >
                        Cancel
                    </button>
                    </DialogClose>
                    <button
                        type="button"
                        className="w-full h-14 bg-[#018884] rounded-4xl mt-8 text-[#FEFEFE] text-base font-bold"
                    >
                        Log Out
                    </button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </div>
    )
}

export default ProfileSidebar
