"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  countries,
  arabicCountryNames,
  getCountryByCode,
  type Country,
} from "../../constants/countries";
import { cn } from "../../lib/utils";
import { Image } from "@/components/ui/image";

export interface PhoneValue {
  // iso2 country code (e.g. 'EG'), not the dial code
  code: string;
  number: string;
}

interface PhoneInputProps {
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  language?: "en" | "ar"; // For translation support
  searchPlaceholder?: string;
  radius?: "full" | "md";
  // allow native input props like minLength to be forwarded
  minLength?: number;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Phone number",
      disabled = false,
      className,
      language = "en",
      searchPlaceholder = "Search country...",
      radius = "full",
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const radiusWrapper = radius === "md" ? "rounded-[20px]" : "rounded-full";
    const radiusLeft = radius === "md" ? "rounded-l-[20px]" : "rounded-l-full";
    const radiusRight = radius === "md" ? "rounded-r-[20px]" : "rounded-r-full";

    // Get current selected country. support both iso2 and dial code values for backwards compatibility
    const selectedCountry = React.useMemo(() => {
      const code = value?.code?.toUpperCase() || "";
      const byIso2 = countries.find((c) => c.iso2 === code);
      if (byIso2) return byIso2;

      return getCountryByCode(value?.code) || countries[0];
    }, [value]);

    // Get country name
    const getCountryName = React.useCallback(
      (country: Country) => {
        if (language === "ar" && arabicCountryNames[country.iso2]) {
          return arabicCountryNames[country.iso2];
        }
        return country.name;
      },
      [language],
    );

    // Filter countries based on search term
    const filteredCountries = React.useMemo(() => {
      if (!searchTerm) return countries;

      return countries.filter((country) => {
        const countryName = getCountryName(country).toLowerCase();
        const search = searchTerm.toLowerCase();
        return (
          countryName.includes(search) ||
          country.phone[0].includes(search) ||
          country.iso2.toLowerCase().includes(search)
        );
      });
    }, [searchTerm, getCountryName]);

    // Handle clicking outside to close dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    // Handle country selection
    const handleCountrySelect = (country: Country) => {
      // send iso2 code so callers can map to phone_country easily
      onChange({
        code: country.iso2,
        number: value.number,
      });
      setIsOpen(false);
      setSearchTerm("");
    };

    const getPhoneMaxLength = (countryIso2: string): number => {
      switch (countryIso2.toUpperCase()) {
        case "EG":
          return 11;
        case "SA":
          return 9;
        case "AE":
          return 9;
        case "US":
          return 10;
        case "GB":
          return 10;
        case "FR":
          return 9;
        default:
          return 15;
      }
    };

    const maxPhoneLength = getPhoneMaxLength(selectedCountry.iso2);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newNumber = e.target.value.replace(/[^\d]/g, ""); // Only allow digits
      if (newNumber.length > maxPhoneLength) {
        newNumber = newNumber.slice(0, maxPhoneLength);
      }
      onChange({
        code: value.code,
        number: newNumber,
      });
    };

    return (
      <div className={cn("relative w-full", className)} dir="ltr">
        <div
          className={cn(
            "relative flex items-center h-12 md:h-14 border border-[#DEDDDD] transition-colors",
            "hover:border-[#018884] focus-within:border-[#018884]",
            "bg-white text-foreground",
            "dark:border-white/20 dark:hover:border-white/40 dark:bg-transparent dark:text-white",
            disabled && "opacity-50 cursor-not-allowed",
            radiusWrapper,
          )}
        >
          {/* Country selector button */}
          <button
            ref={buttonRef}
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center gap-2 h-full px-3",
              radiusLeft,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
              "disabled:pointer-events-none disabled:opacity-50",
              isOpen && "bg-accent/5",
            )}
          >
            {/* Country flag */}
            <Image
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.iso2}.svg`}
              alt={`${selectedCountry.name} flag`}
              width={24}
              height={16}
              className="w-6 h-4 object-cover rounded-sm shrink-0"
              draggable={false}
            />
            {/* Country code */}
            <span className="text-sm font-medium text-foreground">
              +{selectedCountry.phone[0]}
            </span>
            {/* Dropdown arrow */}
            {isOpen ? (
              <ChevronUp size={16} className="opacity-50 shrink-0" />
            ) : (
              <ChevronDown size={16} className="opacity-50 shrink-0" />
            )}
          </button>

          {/* Vertical separator */}
          <div className="h-full w-px bg-slate-200 shrink-0" />

          {/* Phone number input */}
          <input
            ref={ref}
            type="tel"
            dir="ltr"
            value={value.number}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            minLength={props.minLength}
            maxLength={maxPhoneLength}
            className={cn(
              "flex-1 h-full px-4 py-3 bg-transparent border-0 outline-none text-sm",
              "placeholder:text-muted-foreground text-foreground",
              "dark:text-white dark:placeholder:text-white/60",
              "focus:outline-none focus:ring-0",
              "text-left rtl:placeholder:text-right ltr:placeholder:text-left", // always LTR
              disabled && "cursor-not-allowed",
              radiusRight,
            )}
            {...props}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full start-0 end-0 z-50 mt-2 rounded-md border border-input text-popover-foreground shadow-md max-h-60 overflow-hidden bg-white"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {/* Search input */}
            <div className="p-2 border-b border-muted">
              <input
                type="text"
                dir={language === "ar" ? "rtl" : "ltr"}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 rounded-md bg-popover px-3 text-popover-foreground placeholder:text-muted-foreground text-sm text-start border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
              />
            </div>

            {/* Countries list */}
            <div className="overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-muted/20 scrollbar-track-transparent">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.iso2}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "relative flex w-full items-center cursor-pointer select-none rounded-sm py-2 px-3 text-sm outline-none hover:bg-slate-50 transition-colors",
                      selectedCountry.iso2 === country.iso2 && "bg-slate-100",
                    )}
                  >
                    {/* Country flag */}
                    <Image
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso2}.svg`}
                      alt={`${country.name} flag`}
                      width={24}
                      height={16}
                      className="w-6 h-4 object-cover rounded-sm shrink-0"
                      draggable={false}
                    />
                    {/* Country name */}
                    <span className="flex-1 text-sm truncate text-popover-foreground ps-3 text-start">
                      {getCountryName(country)}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      +{country.phone[0]}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
