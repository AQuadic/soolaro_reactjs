import { useState } from "react"
import Edit from "@/components/icons/profile/Edit"
import clsx from "clsx"
import { Link } from "react-router-dom"
import MobileBackHeader from "@/components/general/MobileBackHeader"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddNewAddress from "./AddNewAddress"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { getAddresses, type Address } from "@/lib/api/addresses/getAddresses"
import { Skeleton } from "@/components/ui/skeleton"

const Addresses = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editAddressId, setEditAddressId] = useState<number | null>(null);
  const { t } = useTranslation("profile")

  const { data: addresses = [], isLoading, isError } = useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    staleTime: 1000 * 60 * 5,
  })

    return (
        <section>
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold md:block hidden">
            {t("myAddresses")}
        </h1>

        <Link to="/" className="md:hidden flex items-center gap-3">
            <MobileBackHeader />
            <p className="text-[#0B0B0B] text-base font-semibold mb-6">
            {t("myAddresses")}
            </p>
        </Link>

        <div className="md:mt-8 mt-4 space-y-6">
            {isLoading
            ? [1, 2, 3].map(i => (
                <Skeleton
                    key={i}
                    className="w-full md:px-4 px-3 md:py-7 py-3 rounded-4xl h-16"
                />
                ))
            : isError
            ? <p className="text-center mt-6 text-red-500">{t("failedToLoadAddresses")}</p>
            : addresses.map((address, index) => (
                <div
                    key={address.id || index}
                    onClick={() => setSelectedIndex(index)}
                    className={clsx(
                    "w-full md:px-4 px-3 md:py-7 py-3 rounded-4xl flex items-center justify-between cursor-pointer transition-all",
                    selectedIndex === index
                        ? "bg-[#F6F6F6] border-2 border-[#018884]"
                        : "bg-[#F6F6F6] border-2 border-transparent"
                    )}
                >
                    <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium w-full">
                    {address.details || address.title}
                    </p>

                    <Dialog open={editAddressId === address.id} onOpenChange={open => !open && setEditAddressId(null)}>
                    <DialogTrigger onClick={() => setEditAddressId(address.id)}>
                        <div>
                            <Edit />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-163.75 max-h-[90vh] flex flex-col p-0">
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                        <AddNewAddress addressId={address.id} onSuccess={() => setEditAddressId(null)} />
                        </div>
                    </DialogContent>
                    </Dialog>
                </div>
                ))}

            <Dialog>
            <DialogTrigger className="w-full">
                <button className="w-full h-14 border border-[#018884] rounded-4xl md:mt-8 mt-4 text-[#018884] text-lg font-bold">
                {t("addNewAddress")}
                </button>
            </DialogTrigger>
            <DialogContent className="w-163.75 max-h-[90vh] flex flex-col p-0">
                <div className="flex-1 overflow-y-auto px-6 py-6">
                <AddNewAddress onSuccess={() => {}} />
                </div>
            </DialogContent>
            </Dialog>
        </div>
        </section>
    )
}

export default Addresses
