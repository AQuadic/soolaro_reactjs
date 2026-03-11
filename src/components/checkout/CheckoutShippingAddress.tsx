import { ChevronDown, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@/lib/hooks/use-outside-click";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/lib/api/country";
import { getCitiesByCountry } from "@/lib/api/cities";
import { getAreasByCity } from "@/lib/api/areas";
import { useCartStore } from "@/store/useCartStore";

interface CheckoutShippingAddressProps {
  formData: {
    countryId: string;
    cityId: string;
    areaId: string;
    street: string;
    floorNo: string;
    apartmentNo: string;
    orderNote: string;
  };
  onChange: (field: string, value: string) => void;
}

export const CheckoutShippingAddress = ({
  formData,
  onChange,
}: CheckoutShippingAddressProps) => {
  const { t, i18n } = useTranslation("checkout");
  const lang = (i18n.language?.startsWith("ar") ? "ar" : "en") as "ar" | "en";
  const { fetchCartWithAddress } = useCartStore();

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(countryRef, () => setShowCountryDropdown(false));
  useOnClickOutside(cityRef, () => setShowCityDropdown(false));
  useOnClickOutside(areaRef, () => setShowAreaDropdown(false));

  // Fetch countries
  const { data: countries = [], isLoading: isCountriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  // Fetch cities based on selected country
  const { data: cities = [], isLoading: isCitiesLoading } = useQuery({
    queryKey: ["cities", formData.countryId],
    queryFn: () => getCitiesByCountry(Number(formData.countryId)),
    enabled: !!formData.countryId,
  });

  // Fetch areas based on selected city
  const { data: areas = [], isLoading: isAreasLoading } = useQuery({
    queryKey: ["areas", formData.cityId],
    queryFn: () => getAreasByCity(Number(formData.cityId)),
    enabled: !!formData.cityId,
  });

  // Get selected names for display
  const selectedCountryName =
    countries.find((c) => c.id.toString() === formData.countryId)?.name[lang] ||
    "";
  const selectedCityName =
    cities.find((c) => c.id.toString() === formData.cityId)?.name[lang] || "";
  const selectedAreaName =
    areas.find((a) => a.id.toString() === formData.areaId)?.name[lang] || "";

  return (
    <div className="flex flex-col gap-6">
      {/* Country and City Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            {t("country")}
          </label>
          <div className="relative" ref={countryRef}>
            <button
              type="button"
              className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-left flex items-center justify-between text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              <span
                className={
                  selectedCountryName ? "text-[#0B0B0B]" : "text-[#3B3B3B]"
                }
              >
                {selectedCountryName || t("countryPlaceholder")}
              </span>
              <ChevronDown className="w-5 h-5" />
            </button>
            {showCountryDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                {isCountriesLoading ? (
                  <div className="flex items-center justify-center py-5">
                    <Loader className="w-6 h-6 animate-spin text-[#018884]" />
                  </div>
                ) : countries.length > 0 ? (
                  countries.map((country) => (
                    <button
                      key={country.id}
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-[#F5FAFA] text-sm md:text-base"
                      onClick={() => {
                        onChange("countryId", country.id.toString());
                        onChange("cityId", "");
                        onChange("areaId", "");
                        setShowCountryDropdown(false);
                      }}
                    >
                      {country.name[lang]}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-[#8E8E8E]">
                    {t("noCountriesAvailable")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            {t("emirate")}
          </label>
          <div className="relative" ref={cityRef}>
            <button
              type="button"
              className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-left flex items-center justify-between text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              disabled={!formData.countryId}
            >
              <span
                className={
                  selectedCityName ? "text-[#0B0B0B]" : "text-[#3B3B3B]"
                }
              >
                {selectedCityName ||
                  (formData.countryId
                    ? t("emiratePlaceholder")
                    : t("countryPlaceholder"))}
              </span>
              <ChevronDown className="w-5 h-5" />
            </button>
            {showCityDropdown && formData.countryId && (
              <div className="absolute z-10 w-full mt-2 bg-white border rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                {isCitiesLoading ? (
                  <div className="flex items-center justify-center py-5">
                    <Loader className="w-6 h-6 animate-spin text-[#018884]" />
                  </div>
                ) : cities.length > 0 ? (
                  cities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      className="w-full px-4 py-3 ltr:text-left rtl:text-right hover:bg-[#F5FAFA]"
                      onClick={() => {
                        const cityIdStr = city.id.toString();
                        onChange("cityId", cityIdStr);
                        onChange("areaId", "");
                        setShowCityDropdown(false);
                        fetchCartWithAddress(cityIdStr);
                      }}
                    >
                      {city.name[lang]}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-[#8E8E8E]">
                    {t("noCitiesAvailable")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Area and Street Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            {t("area")}
          </label>
          <div className="relative" ref={areaRef}>
            <button
              type="button"
              className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-left flex items-center justify-between text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowAreaDropdown(!showAreaDropdown)}
              disabled={!formData.cityId}
            >
              <span
                className={
                  selectedAreaName ? "text-[#0B0B0B]" : "text-[#3B3B3B]"
                }
              >
                {selectedAreaName ||
                  (formData.cityId
                    ? t("areaPlaceholder")
                    : t("emiratePlaceholder"))}
              </span>
              <ChevronDown className="w-5 h-5" />
            </button>
            {showAreaDropdown && formData.cityId && (
              <div className="absolute z-10 w-full mt-2 bg-white border rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                {isAreasLoading ? (
                  <div className="flex items-center justify-center py-5">
                    <Loader className="w-6 h-6 animate-spin text-[#018884]" />
                  </div>
                ) : areas.length > 0 ? (
                  areas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      className="w-full px-4 py-3 ltr:text-left rtl:text-right hover:bg-[#F5FAFA]"
                      onClick={() => {
                        const areaIdStr = area.id.toString();
                        onChange("areaId", areaIdStr);
                        setShowAreaDropdown(false);
                        fetchCartWithAddress(formData.cityId, areaIdStr);
                      }}
                    >
                      {area.name[lang]}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-[#8E8E8E]">
                    {t("noAreasAvailable")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            {t("street")}
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder={t("streetPlaceholder")}
            value={formData.street}
            onChange={(e) => onChange("street", e.target.value)}
          />
        </div>
      </div>

      {/* Floor No. and Apartment No. Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            {t("floorNo")}
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder={t("floorNoPlaceholder")}
            value={formData.floorNo}
            onChange={(e) => onChange("floorNo", e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            {t("apartmentNo")}
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder={t("apartmentNoPlaceholder")}
            value={formData.apartmentNo}
            onChange={(e) => onChange("apartmentNo", e.target.value)}
          />
        </div>
      </div>

      {/* Order Note */}
      <div className="flex flex-col gap-3">
        <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
          {t("orderNote")}
        </label>
        <textarea
          className="w-full h-32 md:h-[173px] border border-[#DEDDDD] rounded-[20px] px-4 py-3 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors resize-none"
          placeholder={t("orderNotePlaceholder")}
          value={formData.orderNote}
          onChange={(e) => onChange("orderNote", e.target.value)}
        />
      </div>
    </div>
  );
};
