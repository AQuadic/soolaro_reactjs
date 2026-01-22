import ProfileSidebar from "@/components/profile/ProfileSidebar"
import { Outlet } from "react-router-dom"

const ProfilePage = () => {
  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3">
          <ProfileSidebar />
        </aside>

        <main className="col-span-12 md:col-span-9">
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default ProfilePage
