import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AddNewAddress = () => {
    return (
        <section>
            <h2 className="text-[#0B0B0B] text-xl font-medium">
                Add New Address
            </h2>
            
            <div className="mt-6">
                <label htmlFor="country" className="text-[#0B0B0B] text-base font-semibold">
                    Country
                </label>
                <Select>
                    <SelectTrigger className="w-full h-14! mt-3 rounded-4xl">
                        <SelectValue placeholder="Choose your country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="a">A</SelectItem>
                        <SelectItem value="b">B</SelectItem>
                        <SelectItem value="c">C</SelectItem>
                    </SelectContent>
                    </Select>
            </div>

            <div className="mt-6">
                <label htmlFor="city" className="text-[#0B0B0B] text-base font-semibold">
                    Emirate / City
                </label>
                <Select>
                    <SelectTrigger className="w-full h-14! mt-3 rounded-4xl">
                        <SelectValue placeholder="Choose your Emirate - City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="a">A</SelectItem>
                        <SelectItem value="b">B</SelectItem>
                        <SelectItem value="c">C</SelectItem>
                    </SelectContent>
                    </Select>
            </div>

            <div className="mt-6">
                <label htmlFor="area" className="text-[#0B0B0B] text-base font-semibold">
                    Area
                </label>
                <input
                    type="text"
                    className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                    placeholder="Enter your area"
                    />
            </div>

            <div className="mt-6">
                <label htmlFor="street" className="text-[#0B0B0B] text-base font-semibold">
                    Street
                </label>
                <input
                    type="text"
                    className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                    placeholder="Enter your street"
                    />
            </div>

            <div className="flex items-center gap-6">
                <div className="mt-6 w-full">
                    <label htmlFor="fllor" className="text-[#0B0B0B] text-base font-semibold">
                        Floor No,
                    </label>
                    <input
                        type="text"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                        placeholder="Enter your floor no."
                        />
                </div>
                <div className="mt-6 w-full">
                    <label htmlFor="apartment" className="text-[#0B0B0B] text-base font-semibold">
                        Apartment No.
                    </label>
                    <input
                        type="text"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                        placeholder="Enter your apartment no."
                        />
                </div>
            </div>

            <Dialog>
                <DialogTrigger className="w-full">
                    <button className="md:mt-10 mt-6 w-full md:h-14 h-12 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold">
                        Save
                    </button>
                </DialogTrigger>
                <DialogContent className="md:w-[655px] h-80 flex flex-col items-center justify-end">
                    <DialogHeader>
                    <DialogTitle className="text-[#0B0B0B] md:text-2xl text-base font-semibold text-center">
                        New address has been added successfully.
                    </DialogTitle>
                    <DialogFooter className="sm:justify-start flex flex-row md:mt-0 mt-6">
                        <DialogClose asChild>
                        <button
                            type="button"
                            className="w-full h-14 border border-[#DEDDDD] rounded-4xl md:mt-10 text-[#3B3B3B] text-base font-bold"
                        >
                            Cancel
                        </button>
                        </DialogClose>
                        <button
                            type="button"
                            className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 text-[#FEFEFE] text-base font-bold"
                        >
                            Continue
                        </button>
                    </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default AddNewAddress
