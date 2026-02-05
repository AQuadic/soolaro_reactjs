import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/lib/api/country";

const AddNewAddress = () => {
    const { t, i18n } = useTranslation("profile");

    const { data: countries, isLoading } = useQuery({
        queryKey: ["countries"],
        queryFn: getCountries,
    });

    return (
        <section>
            <h2 className="text-[#0B0B0B] text-xl font-medium">
                {t("addNewAddress")}
            </h2>

            <div className="mt-6">
                <label htmlFor="country" className="text-[#0B0B0B] text-base font-semibold">
                {t("country")}
                </label>
                <Select>
                    <SelectTrigger className="w-full h-14! mt-3 rounded-4xl">
                        <SelectValue
                        placeholder={
                            isLoading ? t("loading") : t("chooseCountry")
                        }
                        />
                    </SelectTrigger>

                    <SelectContent>
                        {countries?.map((country) => {
                        const name =
                            country.name[i18n.language as "ar" | "en"] ??
                            country.name.en;

                        return (
                            <SelectItem
                            key={country.id}
                            value={String(country.id)}
                            >
                            {name}
                            </SelectItem>
                        );
                        })}
                    </SelectContent>
                    </Select>
            </div>

            <div className="mt-6">
                <label htmlFor="city" className="text-[#0B0B0B] text-base font-semibold">
                {t("emirateCity")}
                </label>
                <Select>
                    <SelectTrigger className="w-full h-14! mt-3 rounded-4xl">
                        <SelectValue placeholder={t("chooseEmirateCity")} />
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
                {t("area")}
                </label>
                <input
                    type="text"
                    className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                    placeholder={t("enterArea")}
                    />
            </div>

            <div className="mt-6">
                <label htmlFor="street" className="text-[#0B0B0B] text-base font-semibold">
                {t("street")}
                </label>
                <input
                    type="text"
                    className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                    placeholder={t("enterStreet")}
                    />
            </div>

            <div className="flex items-center gap-6">
                <div className="mt-6 w-full">
                    <label htmlFor="floor" className="text-[#0B0B0B] text-base font-semibold">
                        {t("floorNo")}
                    </label>
                    <input
                        type="text"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                        placeholder={t("enterFloorNo")}
                        />
                </div>
                <div className="mt-6 w-full">
                    <label htmlFor="apartment" className="text-[#0B0B0B] text-base font-semibold">
                        {t("apartmentNo")}
                    </label>
                    <input
                        type="text"
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
                        placeholder={t("enterApartmentNo")}
                        />
                </div>
            </div>

            <Dialog>
                <DialogTrigger className="w-full">
                    <button className="md:mt-10 mt-6 w-full md:h-14 h-12 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold">
                        {t("save")}
                    </button>
                </DialogTrigger>
                <DialogContent className="md:w-[655px] flex flex-col items-center justify-end">
                    <DialogHeader>
                        <img
                            src='/images/profile/check.gif'
                            alt="success"
                            className="w-[213px] h-[213px] mx-auto"
                        />
                    <DialogTitle className="text-[#0B0B0B] md:text-2xl text-base font-semibold text-center">
                        {t("addressAddedSuccess")}
                    </DialogTitle>
                    <DialogFooter className="sm:justify-start flex flex-row md:mt-0 mt-6">
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
                            className="w-full h-14 bg-[#018884] rounded-4xl md:mt-10 text-[#FEFEFE] text-base font-bold"
                        >
                            {t("continue")}
                        </button>
                    </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default AddNewAddress
