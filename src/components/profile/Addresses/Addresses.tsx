import { useState } from "react"
import Edit from "@/components/icons/profile/Edit"
import clsx from "clsx"
import { Link } from "react-router-dom"
import MobileBackHeader from "@/components/general/MobileBackHeader"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddNewAddress from "./AddNewAddress"

const addresses = [
  "United Arab Emirates, Dubai, Business Bay, Al Abraj Street, Al Nakheel Tower, Floor 12, Apartment 1205",
  "United Arab Emirates, Dubai, Business Bay, Al Abraj Street, Al Nakheel Tower, Floor 12, Apartment 1205",
  "United Arab Emirates, Dubai, Business Bay, Al Abraj Street, Al Nakheel Tower, Floor 12, Apartment 1205",
]

const Addresses = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    return (
        <section>
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold md:block hidden">
            My Addresses
        </h1>

        <Link to='/' className="md:hidden flex items-center gap-3">
            <MobileBackHeader />
            <p className="text-[#0B0B0B] text-base font-semibold mb-6">
                My Addresses
            </p>
        </Link>

        <div className="md:mt-8 mt-4 space-y-6">
            {addresses.map((address, index) => (
            <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={clsx(
                "w-full md:px-4 px-3 md:py-7 py-3 rounded-4xl flex items-center justify-between cursor-pointer transition-all",
                selectedIndex === index
                    ? "bg-[#F6F6F6] border-2 border-[#018884]"
                    : "bg-[#F6F6F6] border-2 border-transparent"
                )}
            >
                <p className="text-[#0B0B0B] md:text-base text-[10px] font-medium">
                {address}
                </p>
                <Link to='/profile/edit_address'>
                    <Edit />
                </Link>
            </div>
            ))}

            <Dialog>
            <DialogTrigger className="w-full">
                <div>
                    <button className="w-full h-14 border border-[#018884] rounded-4xl md:mt-8 mt-4 text-[#018884] text-lg font-bold">
                        Add New Address
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent
                className=" w-163.75 max-h-[90vh] flex flex-col p-0"
                >
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <AddNewAddress />
                </div>
                </DialogContent>
            </Dialog>
        </div>
        </section>
    )
}

export default Addresses
