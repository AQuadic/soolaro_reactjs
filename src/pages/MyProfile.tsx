import ProfileMobileView from "@/components/profile/ProfileMobileView";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

const ProfilePage = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isProfileRoot = location.pathname === "/profile";

  if (isProfileRoot && isDesktop) {
    return <Navigate to="/profile/info" replace />;
  }

  return (
    <section className="container mx-auto md:py-10">
      <div className="grid grid-cols-12 gap-8">
        <aside
          className={`col-span-12 md:col-span-3 ${
            !isProfileRoot ? "hidden md:block" : ""
          }`}
        >
          <div className="md:block hidden">
            <ProfileSidebar />
          </div>

          <div className="md:hidden block">
            <ProfileMobileView />
          </div>
        </aside>

        <main className={`col-span-12 md:col-span-9`}>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default ProfilePage;
