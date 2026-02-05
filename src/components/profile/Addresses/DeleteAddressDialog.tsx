import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "@/lib/api/addresses/deleteAddress";

interface DeleteAddressDialogProps {
  addressId: number;
  onClose?: () => void;
}

const DeleteAddressDialog = ({ addressId, onClose }: DeleteAddressDialogProps) => {
  const { t } = useTranslation("profile");
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAddress(String(addressId));
      queryClient.invalidateQueries(["addresses"]);

      if (onClose) onClose();
    } catch (error) {
      console.error("Failed to delete address", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/images/cart/remove.gif"
        alt="Remove item"
        className="w-[267px] h-[267px] object-contain"
      />
      <h2 className="md:text-4xl text-2xl font-bold">{t("deleteAddress")}</h2>
      <p className="md:text-2xl my-4 text-center">{t("deleteAddressConfirmation")}</p>
      <div className="w-full flex items-center gap-4">
        <button
          type="button"
          onClick={onClose}
          className="w-full h-14 border border-[#DEDDDD] rounded-4xl md:mt-10 text-[#3B3B3B] text-base font-bold"
        >
          {t("cancel")}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 text-[#FEFEFE] text-base font-bold"
        >
          {isDeleting ? t("deleting") : t("continue")}
        </button>
      </div>
    </div>
  );
};

export default DeleteAddressDialog;
