import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import MobileBackHeader from "../general/MobileBackHeader";
import { PhoneInput, type PhoneValue } from "../ui/PhoneInput";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/useAuthStore";
import { updateUser } from "@/lib/api/profile/updateUser";

const ProfileInfo = () => {
  const { t } = useTranslation("profile");
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<{
    phone_country: null;
    name: string;
    phone: PhoneValue | string;
    email: string;
    password: string;
  }>({
    name: "",
    phone: "",
    email: "",
    password: "",
    phone_country: null,
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone_e164 ?? "",
      password: "",
      phone_country: null,
    });
  }, [user]);

  const onChange = (
    field: "name" | "phone" | "email" | "password",
    value: string | PhoneValue,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);

      const payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.phone && typeof formData.phone !== "string") {
        payload.phone = formData.phone.number || null;
        payload.phone_country = formData.phone.countryCode || "EG";
        payload.phone_e164 = formData.phone.e164 || null;
        payload.phone_national = formData.phone.national || null;
        payload.phone_normalized = formData.phone.e164 || null;
      } else if (formData.phone && typeof formData.phone === "string") {
        payload.phone = formData.phone.startsWith("+")
          ? formData.phone
          : `+20${formData.phone.replace(/^0/, "")}`;
        payload.phone_country = "EG";
        payload.phone_e164 = payload.phone;
        payload.phone_normalized = payload.phone;
      }

      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await updateUser(payload);

      setUser(response.user);

      setOpen(true);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mb-12">
      <div className="md:flex hidden items-center justify-between">
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold leading-[100%]">
          {t("myProfile")}
        </h1>
        <Link
          to="/profile/change_password"
          className="text-[#018884] text-lg font-bold underline"
        >
          {t("changePassword")}
        </Link>
      </div>

      <MobileBackHeader title={t("myProfile")} link="/profile" />

      <div className="md:mt-12 mt-4">
        <div>
          <label
            htmlFor="name"
            className="text-[#0B0B0B] text-base font-semibold"
          >
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
          <label
            htmlFor="phone"
            className="text-[#0B0B0B] text-base font-semibold"
          >
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
          <label
            htmlFor="email"
            className="text-[#0B0B0B] text-base font-semibold"
          >
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

        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="w-full h-14 bg-[#018884] rounded-4xl mt-8 text-[#FEFEFE] text-lg font-bold disabled:opacity-50"
        >
          {isSaving ? t("saving") : t("saveChanges")}
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="md:w-[655px] flex flex-col items-center justify-end">
            <DialogHeader>
              <img
                src="/images/profile/check.gif"
                alt="success"
                className="md:w-[213px] md:h-[213px] mx-auto"
              />
              <DialogTitle className="text-[#0B0B0B] text-xl font-semibold text-center">
                {t("profileUpdated")}
              </DialogTitle>

              <DialogFooter className="sm:justify-start mt-10 gap-4">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="w-full h-14 border border-[#DEDDDD] rounded-4xl text-[#3B3B3B] text-base font-bold"
                  >
                    {t("cancel")}
                  </button>
                </DialogClose>
                <DialogClose asChild>
                  <button className="w-full h-14 bg-[#018884] rounded-4xl text-white font-bold">
                    {t("continue")}
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Link
          to="/profile/change_password"
          className="text-[#018884] text-lg font-bold md:underline md:hidden flex items-center justify-center mt-4"
        >
          {t("changePassword")}
        </Link>
      </div>
    </section>
  );
};

export default ProfileInfo;
