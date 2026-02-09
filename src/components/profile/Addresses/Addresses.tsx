import { useState } from "react";
import Edit from "@/components/icons/profile/Edit";
import clsx from "clsx";

import MobileBackHeader from "@/components/general/MobileBackHeader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNewAddress from "./AddNewAddress";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAddresses, type Address } from "@/lib/api/addresses/getAddresses";
import { Skeleton } from "@/components/ui/skeleton";
import Delete from "@/components/icons/profile/Delete";
import DeleteAddressDialog from "./DeleteAddressDialog";

const Addresses = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editAddressId, setEditAddressId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { t } = useTranslation("profile");

  const {
    data: addresses = [],
    isLoading,
    isError,
  } = useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    staleTime: 1000 * 60 * 5,
  });

  const handleShowSuccess = (edit: boolean) => {
    setIsEdit(edit);
    setShowAddDialog(false);
    setEditAddressId(null);
    setTimeout(() => {
      setShowSuccess(true);
    }, 100);
  };

  return (
    <section>
      <h1 className="text-[#0B0B0B] text-[40px] font-semibold md:block hidden">
        {t("myAddresses")}
      </h1>

      <MobileBackHeader title={t("myAddresses")} link="/profile" />

      <div className="md:mt-8 mt-4 space-y-6">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="w-full md:px-4 px-3 md:py-7 py-3 rounded-4xl h-16"
            />
          ))
        ) : isError ? (
          <p className="text-center mt-6 text-red-500">
            {t("failedToLoadAddresses")}
          </p>
        ) : (
          addresses.map((address, index) => (
            <div
              key={address.id ?? index}
              onClick={() => setSelectedIndex(index)}
              className={clsx(
                "w-full md:px-4 px-3 md:py-7 py-3 rounded-4xl flex items-center justify-between cursor-pointer transition-all",
                selectedIndex === index
                  ? "bg-[#F6F6F6] border-2 border-[#018884]"
                  : "bg-[#F6F6F6] border-2 border-transparent",
              )}
            >
              <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium w-full">
                {address.details || address.title}
              </p>

              <div className="flex items-center gap-3">
                <Dialog>
                  <DialogTrigger>
                    <div>
                      <Delete />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-163.75 max-h-[90vh] flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <DeleteAddressDialog
                        addressId={address.id ?? index}
                        onClose={() => setSelectedIndex(null)}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={editAddressId === address.id}
                  onOpenChange={(open) => {
                    if (!open) setEditAddressId(null);
                  }}
                >
                  <DialogTrigger
                    onClick={() => address.id && setEditAddressId(address.id)}
                  >
                    <div>
                      <Edit />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-163.75 max-h-[90vh] flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <AddNewAddress
                        addressId={address.id}
                        onSuccess={() => {}}
                        onShowSuccess={handleShowSuccess}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        )}

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger
            className="w-full"
            onClick={() => setShowAddDialog(true)}
          >
            <button className="w-full h-14 border border-[#018884] rounded-4xl md:mt-8 mt-4 text-[#018884] text-lg font-bold">
              {t("addNewAddress")}
            </button>
          </DialogTrigger>
          <DialogContent className="w-163.75 max-h-[90vh] flex flex-col p-0">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AddNewAddress
                onSuccess={() => {}}
                onShowSuccess={handleShowSuccess}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="md:w-[655px] flex flex-col items-center justify-end">
          <DialogHeader>
            <img
              src="/images/profile/check.gif"
              alt="success"
              className="w-[213px] h-[213px] mx-auto"
            />
            <DialogTitle className="text-[#0B0B0B] md:text-2xl text-base font-semibold text-center">
              {isEdit ? t("addressUpdatedSuccess") : t("addressAddedSuccess")}
            </DialogTitle>
            <DialogFooter className="sm:justify-start flex flex-row md:mt-0 mt-6 gap-4">
              <DialogClose asChild>
                <button
                  type="button"
                  className="w-full h-14 border border-[#DEDDDD] rounded-4xl md:mt-10 text-[#3B3B3B] text-base font-bold"
                >
                  {t("cancel")}
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 text-[#FEFEFE] text-base font-bold"
              >
                {t("continue")}
              </button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Addresses;
