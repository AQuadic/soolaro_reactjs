import { useState } from "react"
import Edit from "@/components/icons/profile/Edit"
import clsx from "clsx"

const addresses = [
  "United Arab Emirates, Dubai, Business Bay, Al Abraj Street, Al Nakheel Tower, Floor 12, Apartment 1205",
  "United Arab Emirates, Dubai, Business Bay, Al Abraj Street, Al Nakheel Tower, Floor 12, Apartment 1205",
  "United Arab Emirates, Dubai, Business Bay, Al Abraj Street, Al Nakheel Tower, Floor 12, Apartment 1205",
]

const Addresses = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    return (
        <section>
        <h1 className="text-[#0B0B0B] text-[40px] font-semibold">
            My Addresses
        </h1>

        <div className="mt-8 space-y-6">
            {addresses.map((address, index) => (
            <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={clsx(
                "w-full px-4 py-7 rounded-4xl flex items-center justify-between cursor-pointer transition-all",
                selectedIndex === index
                    ? "bg-[#F6F6F6] border-2 border-[#018884]"
                    : "bg-[#F6F6F6] border-2 border-transparent"
                )}
            >
                <p className="text-[#0B0B0B] text-base font-medium">
                {address}
                </p>
                <Edit />
            </div>
            ))}

            <button className="w-full h-14 border border-[#018884] rounded-4xl mt-8 text-[#018884] text-lg font-bold">
                Add New Address
            </button>
        </div>
        </section>
    )
}

export default Addresses
