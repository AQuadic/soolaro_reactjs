import MobileBackHeader from "@/components/general/MobileBackHeader";
import ClosedEye from "@/components/icons/auth/ClosedEye"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom";

const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section className="mb-12">
            <h1 className="text-[#0B0B0B] text-[40px] font-semibold md:block hidden">
                Change Password
            </h1>
            
            <Link to='/' className="md:hidden flex items-center gap-3">
                <MobileBackHeader />
                <p className="text-[#0B0B0B] md:text-base text-sm font-semibold mb-6">
                    Change Password
                </p>
            </Link>

            <div className="md:mt-12 mt-4">
                <div className="relative">
                    <label htmlFor="old_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold">
                        Old Password
                    </label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        name="password"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOldPassword((prev) => !prev)}
                        className="absolute top-13 right-4 cursor-pointer"
                    >
                        {showOldPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <div className="relative mt-6">
                    <label htmlFor="new_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold">
                        New Password
                    </label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute top-13 right-4 cursor-pointer"
                    >
                        {showNewPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <div className="relative mt-6">
                    <label htmlFor="confirm_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold">
                        Confirm New Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-13 right-4 cursor-pointer"
                    >
                        {showConfirmPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <Dialog>
                    <DialogTrigger className="w-full">
                        <button className="w-full h-14 bg-[#018884] rounded-4xl mt-8 text-[#FEFEFE] md:text-lg text-base font-bold">
                            Save Changes
                        </button>
                    </DialogTrigger>
                    <DialogContent className="md:w-[655px] md:h-89.25 h-80 flex flex-col items-center justify-end">
                        <DialogHeader>
                        <DialogTitle className="text-[#0B0B0B] md:text-xl text-base font-semibold text-center">
                            Your password has been changed successfully.
                        </DialogTitle>
                        
                        <DialogFooter className="sm:justify-start flex flex-row md:mt-10 mt-6">
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
            </div>
        </section>
    )
}

export default ChangePassword
