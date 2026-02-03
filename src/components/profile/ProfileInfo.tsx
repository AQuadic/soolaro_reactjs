import { Link } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import MobileBackHeader from "../general/MobileBackHeader";
import { PhoneInput, type PhoneValue } from "../ui/PhoneInput";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileInfo = () => {
  const { t } = useTranslation("profile");
  const user = useAuthStore((state) => state.user);
    const [formData, setFormData] = useState<{
    name: string;
    phone: PhoneValue | string;
    email: string;
    password: string;
    }>({
    name: "",
    phone: "",
    email: "",
    password: "",
    });

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone_e164 ?? "",
      password: "",
    });
  }, [user]);

  const onChange = (field: "name" | "phone" | "email" | "password", value: string | PhoneValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
    return (
        <section className="mb-12">
            <div className="md:flex hidden items-center justify-between">
                <h1 className="text-[#0B0B0B] text-[40px] font-semibold leading-[100%]">
                {t("myProfile")}
                </h1>
                <Link to="/profile/change_password" className="text-[#018884] text-lg font-bold underline">
                {t("changePassword")}
                </Link>
            </div>

        <Link to="/" className="md:hidden flex items-center gap-3">
                <MobileBackHeader />
                <p className="text-[#0B0B0B] text-base font-semibold mb-6">
                    {t("myProfile")}
                </p>
            </Link>

            <div className="md:mt-12 mt-4">
                <div>
                    <label htmlFor="name" className="text-[#0B0B0B] text-base font-semibold">
                        {t("name")}
                    </label>
                    <input
                        type="text"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("namePlaceholder")}
                        value={formData.name}
                        onChange={(e) => onChange("name", e.target.value)}
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="phone" className="text-[#0B0B0B] text-base font-semibold">
                {t("phoneNumber")}
                    </label>
                    <PhoneInput
                        value={formData.phone as PhoneValue}
                        onChange={(value) => onChange("phone", value)}
                        radius="md"
                        className="h-12 md:h-14 rounded-[20px] border-[#DEDDDD] mt-3"
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="email" className="text-[#0B0B0B] text-base font-semibold">
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) => onChange("email", e.target.value)}
                    />
                </div>

                <Dialog>
                    <DialogTrigger asChild className="w-full">
                        <button className="w-full h-14 bg-[#018884] rounded-4xl mt-8 text-[#FEFEFE] text-lg font-bold">
                        {t("saveChanges")}
                        </button>
                    </DialogTrigger>
                    <DialogContent className="md:w-[655px] md:h-89.25 h-80 flex flex-col items-center justify-end">
                        <DialogHeader>
                            <img
                                src='/images/profile/check.gif'
                                alt="success"
                                className="w-[213px] h-[213px] mx-auto"
                            />
                        <DialogTitle className="text-[#0B0B0B] text-xl font-semibold text-center">
                            {t("profileUpdated")}
                        </DialogTitle>

                        <DialogFooter className="sm:justify-start mt-10 gap-4">
                            <DialogClose asChild>
                                <button type="button" className="w-full h-14 border border-[#DEDDDD] rounded-4xl text-[#3B3B3B] text-base font-bold">
                                    {t("cancel")}
                                </button>
                            </DialogClose>
                            <button type="button" className="w-full h-14 bg-[#018884] rounded-4xl text-[#FEFEFE] text-base font-bold">
                                {t("continue")}
                                </button>
                        </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Link to='/profile/change_password' className="text-[#018884] text-lg font-bold md:underline md:hidden flex items-center justify-center mt-4">
                    {t("changePassword")}
                </Link>
            </div>
        </section>
    )
}

export default ProfileInfo
