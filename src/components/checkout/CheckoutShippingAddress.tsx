import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CheckoutShippingAddressProps {
  formData: {
    country: string;
    emirate: string;
    area: string;
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
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showEmirateDropdown, setShowEmirateDropdown] = useState(false);

  const countries = [
    "United Arab Emirates",
    "Saudi Arabia",
    "Kuwait",
    "Qatar",
    "Bahrain",
    "Oman",
  ];
  const emirates = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Country and Emirate Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Country
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-left flex items-center justify-between text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              <span
                className={
                  formData.country ? "text-[#0B0B0B]" : "text-[#3B3B3B]"
                }
              >
                {formData.country || "Choose your country"}
              </span>
              <ChevronDown className="w-5 h-5 text-[#0B0B0B]" />
            </button>
            {showCountryDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-[#DEDDDD] rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    className="w-full px-4 py-3 text-left hover:bg-[#F5FAFA] text-sm md:text-base"
                    onClick={() => {
                      onChange("country", country);
                      setShowCountryDropdown(false);
                    }}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Emirate / City
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-left flex items-center justify-between text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
              onClick={() => setShowEmirateDropdown(!showEmirateDropdown)}
            >
              <span
                className={
                  formData.emirate ? "text-[#0B0B0B]" : "text-[#3B3B3B]"
                }
              >
                {formData.emirate || "Choose your Emirate / City"}
              </span>
              <ChevronDown className="w-5 h-5 text-[#0B0B0B]" />
            </button>
            {showEmirateDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-[#DEDDDD] rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                {emirates.map((emirate) => (
                  <button
                    key={emirate}
                    type="button"
                    className="w-full px-4 py-3 text-left hover:bg-[#F5FAFA] text-sm md:text-base"
                    onClick={() => {
                      onChange("emirate", emirate);
                      setShowEmirateDropdown(false);
                    }}
                  >
                    {emirate}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Area and Street Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Area
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your area"
            value={formData.area}
            onChange={(e) => onChange("area", e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Street
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your street"
            value={formData.street}
            onChange={(e) => onChange("street", e.target.value)}
          />
        </div>
      </div>

      {/* Floor No. and Apartment No. Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Floor No.
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your floor no."
            value={formData.floorNo}
            onChange={(e) => onChange("floorNo", e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Apartment No.
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your apartment no."
            value={formData.apartmentNo}
            onChange={(e) => onChange("apartmentNo", e.target.value)}
          />
        </div>
      </div>

      {/* Order Note */}
      <div className="flex flex-col gap-3">
        <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
          Order Note
        </label>
        <textarea
          className="w-full h-32 md:h-[173px] border border-[#DEDDDD] rounded-[20px] px-4 py-3 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors resize-none"
          placeholder="Enter your note"
          value={formData.orderNote}
          onChange={(e) => onChange("orderNote", e.target.value)}
        />
      </div>
    </div>
  );
};
