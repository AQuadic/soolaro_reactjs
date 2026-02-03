import MobileBackHeader from "@/components/general/MobileBackHeader";
import ClosedEye from "@/components/icons/auth/ClosedEye";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { changePassword } from "@/lib/api/profile/changePassword";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
    const { t } = useTranslation("profile");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error(t("fillAllFields"));
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(t("passwordMismatch"));
            return;
        }

        setLoading(true);

        try {
            const response = await changePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            toast.success(response.message || t("success"));
            setSuccessDialogOpen(true);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            toast.dismiss();
            toast.error(error.response?.data?.message || t("failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mb-12">
            <h1 className="text-[#0B0B0B] text-[40px] font-semibold md:block hidden">
                {t("title")}
            </h1>

            <Link to="/" className="md:hidden flex items-center gap-3">
                <MobileBackHeader />
                <p className="text-[#0B0B0B] md:text-base text-sm font-semibold mb-6">
                    {t("title")}
                </p>
            </Link>

            <div className="md:mt-12 mt-4">
                <div className="relative">
                    <label htmlFor="old_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold">
                        {t("oldPassword")}
                    </label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        name="current_password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("enterOldPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowOldPassword((prev) => !prev)}
                        className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
                    >
                        {showOldPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <div className="relative mt-6">
                    <label htmlFor="new_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold">
                        {t("newPassword")}
                    </label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("enterNewPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
                    >
                        {showNewPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <div className="relative mt-6">
                    <label htmlFor="confirm_password" className="text-[#0B0B0B] md:text-base text-sm font-semibold">
                        {t("confirmNewPassword")}
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("enterConfirmPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-13 ltr:right-4 rtl:left-4 cursor-pointer"
                    >
                        {showConfirmPassword ? <Eye /> : <ClosedEye />}
                    </button>
                </div>

                <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className={`w-full h-14 rounded-4xl mt-8 text-[#FEFEFE] md:text-lg text-base font-bold ${loading ? "bg-gray-400" : "bg-[#018884]"}`}
                >
                    {loading ? t("saving") : t("saveChanges")}
                </button>

                <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
                    <DialogContent className="md:w-[655px] md:h-89.25 h-80 flex flex-col items-center justify-end">
                        <DialogHeader>
                            <img
                                src="/images/profile/check.gif"
                                alt="success"
                                className="w-[213px] h-[213px] mx-auto"
                            />
                            <DialogTitle className="text-[#0B0B0B] md:text-xl text-base font-semibold text-center">
                                {t("successDialogTitle")}
                            </DialogTitle>

                            <DialogFooter className="sm:justify-start flex flex-row md:mt-10 mt-6 gap-4">
                                <DialogClose asChild>
                                    <button
                                        type="button"
                                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl text-[#3B3B3B] text-base font-bold"
                                    >
                                        {t("cancel")}
                                    </button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <button
                                        type="button"
                                        className="w-full h-14 bg-[#018884] rounded-4xl text-[#FEFEFE] text-base font-bold"
                                    >
                                        {t("continue")}
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    )
}

export default ChangePassword
