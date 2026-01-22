import { Link } from "react-router-dom"

const ProfileInfo = () => {
    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="text-[#0B0B0B] text-[40px] font-semibold leading-[100%]">
                    My Profile
                </h1>
                <Link to='/' className="text-[#018884] text-lg font-bold underline">
                    Change Password
                </Link>
            </div>
            
            <form className="mt-12">
                <div>
                    <label htmlFor="name" className="text-[#0B0B0B] text-base font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="phone" className="text-[#0B0B0B] text-base font-semibold">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="tel"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="+971"
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="email" className="text-[#0B0B0B] text-base font-semibold">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your email"
                    />
                </div>

                <button className="w-full h-14 bg-[#018884] rounded-4xl mt-8 text-[#FEFEFE] text-lg font-bold">
                    Save Changes
                </button>
            </form>
        </section>
    )
}

export default ProfileInfo
