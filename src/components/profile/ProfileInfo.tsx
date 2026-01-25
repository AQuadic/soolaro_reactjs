import { Link } from "react-router-dom"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import MobileBackHeader from "../general/MobileBackHeader"

const ProfileInfo = () => {
    return (
        <section className="mb-12">
            <div className="md:flex hidden items-center justify-between">
                <h1 className="text-[#0B0B0B] text-[40px] font-semibold leading-[100%]">
                    My Profile
                </h1>
                <Link to='/profile/change_password' className="text-[#018884] text-lg font-bold underline">
                    Change Password
                </Link>
            </div>

            <Link to='/' className="md:hidden flex items-center gap-3">
                <MobileBackHeader />
                <p className="text-[#0B0B0B] text-base font-semibold mb-6">
                    My Profile
                </p>
            </Link>
            
            <div className="md:mt-12 mt-4">
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

                <Dialog>
                    <DialogTrigger className="w-full">
                        <button className="w-full h-14 bg-[#018884] rounded-4xl mt-8 text-[#FEFEFE] text-lg font-bold">
                            Save Changes
                        </button>
                    </DialogTrigger>
                    <DialogContent className="md:h-89.25 h-80 flex flex-col items-center justify-end">
                        <DialogHeader>
                        <DialogTitle className="text-[#0B0B0B] text-xl font-semibold text-center">
                            Your profile has been updated successfully.
                        </DialogTitle>
                        
                        <DialogFooter className="sm:justify-start mt-10">
                            <DialogClose asChild>
                                <button type="button" className="w-full h-14 border border-[#DEDDDD] rounded-4xl text-[#3B3B3B] text-base font-bold">
                                    Cancel
                                </button>
                            </DialogClose>
                            <button type="button" className="w-full h-14 bg-[#018884] rounded-4xl text-[#FEFEFE] text-base font-bold">
                                    Continue
                                </button>
                        </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Link to='/profile/change_password' className="text-[#018884] text-lg font-bold md:underline md:hidden flex items-center justify-center mt-4">
                    Change Password
                </Link>
            </div>
        </section>
    )
}

export default ProfileInfo
