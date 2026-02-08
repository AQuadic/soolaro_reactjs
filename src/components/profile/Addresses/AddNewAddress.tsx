import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountries } from "@/lib/api/country";
import { getCitiesByCountry } from "@/lib/api/cities";
import {
  createAddress,
  type AddressRequest,
} from "@/lib/api/addresses/postAddress";
import {
  updateAddress,
  type UpdateAddressPayload,
} from "@/lib/api/addresses/updateAddress";
import { getSingleAddress } from "@/lib/api/addresses/getSingleAddress";
import { Loader2 } from "lucide-react";

interface AddNewAddressProps {
  addressId?: number;
  onSuccess?: () => void;
  onShowSuccess?: (isEdit: boolean) => void;
}

const AddNewAddress = ({ addressId, onSuccess, onShowSuccess }: AddNewAddressProps) => {
  const { t, i18n } = useTranslation("profile");
  const queryClient = useQueryClient();

  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null,
  );
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    area: "",
    street: "",
    floor: "",
    apartment: "",
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities", selectedCountryId],
    queryFn: () =>
      selectedCountryId ? getCitiesByCountry(selectedCountryId) : [],
    enabled: !!selectedCountryId,
  });

  const { data: address, isLoading: loadingAddress } = useQuery({
    queryKey: ["address", addressId],
    queryFn: () =>
      addressId ? getSingleAddress(addressId) : Promise.resolve(null),
    enabled: !!addressId,
  });

  useEffect(() => {
    if (address) {
      setSelectedCountryId(Number(address.country_id));
      setSelectedCityId(Number(address.city_id));
      const detailsParts = address.details.split(",");
      setFormData({
        area: address.title || "",
        street: detailsParts[0] || "",
        floor:
          detailsParts
            .find((p) => p.trim().startsWith("Floor"))
            ?.replace("Floor", "")
            .trim() || "",
        apartment:
          detailsParts
            .find((p) => p.trim().startsWith("Apt"))
            ?.replace("Apt", "")
            .trim() || "",
      });
    }
  }, [address]);

  const createMutation = useMutation({
    mutationFn: (data: AddressRequest) => createAddress(data),
    onSuccess: () => {
      setFormData({ area: "", street: "", floor: "", apartment: "" });
      setSelectedCountryId(null);
      setSelectedCityId(null);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      onSuccess?.();
      setTimeout(() => {
        onShowSuccess?.(false);
      }, 100);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        t("errorAddingAddress");
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateAddressPayload) => updateAddress(addressId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["address", addressId] });
      onSuccess?.();
      setTimeout(() => {
        onShowSuccess?.(true);
      }, 100);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        t("errorUpdatingAddress");
      toast.error(message);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!selectedCountryId || !selectedCityId) {
      toast.error(t("pleaseSelectCountryAndCity"));
      return;
    }

    if (!formData.area || !formData.street) {
      toast.error(t("pleaseEnterRequiredFields"));
      return;
    }

    const details = `${formData.street}${formData.floor ? `, Floor ${formData.floor}` : ""}${formData.apartment ? `, Apt ${formData.apartment}` : ""}`;

    if (addressId) {
      const updatePayload: UpdateAddressPayload = {
        title: formData.area,
        country_id: String(selectedCountryId),
        city_id: String(selectedCityId),
        details,
        location: { lat: 0, lng: 0 },
      };
      updateMutation.mutate(updatePayload);
    } else {
      const createPayload: AddressRequest = {
        title: formData.area,
        country_id: String(selectedCountryId),
        city_id: String(selectedCityId),
        details,
        location: {
          lat: 0,
          lng: 0,
        },
      };
      createMutation.mutate(createPayload);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (loadingAddress)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );

  return (
    <section>
      <h2 className="text-[#0B0B0B] text-xl font-medium">
        {addressId ? t("editAddress") : t("addNewAddress")}
      </h2>

      <div className="mt-6">
        <label className="text-[#0B0B0B] text-base font-semibold">
          {t("country")}
        </label>
        <Select
          value={selectedCountryId ? String(selectedCountryId) : undefined}
          onValueChange={(val) => {
            setSelectedCountryId(Number(val));
            setSelectedCityId(null);
          }}
        >
          <SelectTrigger className="w-full h-14! mt-3 rounded-4xl">
            <SelectValue placeholder={t("chooseCountry")} />
          </SelectTrigger>
          <SelectContent>
            {countries?.map((c) => {
              const name = c.name[i18n.language as "ar" | "en"] ?? c.name.en;
              return (
                <SelectItem key={c.id} value={String(c.id)}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="mt-6">
        <label className="text-[#0B0B0B] text-base font-semibold">
          {t("emirateCity")}
        </label>
        <Select
          value={selectedCityId ? String(selectedCityId) : undefined}
          onValueChange={(val) => setSelectedCityId(Number(val))}
          disabled={!selectedCountryId}
        >
          <SelectTrigger className="w-full h-14! mt-3 rounded-4xl">
            <SelectValue
              placeholder={
                selectedCountryId
                  ? t("chooseEmirateCity")
                  : t("chooseCountryFirst")
              }
            />
          </SelectTrigger>
          <SelectContent>
            {cities?.map((city) => {
              const name =
                city.name[i18n.language as "ar" | "en"] ?? city.name.en;
              return (
                <SelectItem key={city.id} value={String(city.id)}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Area / Street / Floor / Apartment */}
      <div className="mt-6">
        <label className="text-[#0B0B0B] text-base font-semibold">
          {t("area")}
        </label>
        <input
          type="text"
          value={formData.area}
          onChange={(e) => handleInputChange("area", e.target.value)}
          className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
          placeholder={t("enterArea")}
        />
      </div>
      <div className="mt-6">
        <label className="text-[#0B0B0B] text-base font-semibold">
          {t("street")}
        </label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => handleInputChange("street", e.target.value)}
          className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
          placeholder={t("enterStreet")}
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="mt-6 w-full">
          <label className="text-[#0B0B0B] text-base font-semibold">
            {t("floorNo")}
          </label>
          <input
            type="text"
            value={formData.floor}
            onChange={(e) => handleInputChange("floor", e.target.value)}
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
            placeholder={t("enterFloorNo")}
          />
        </div>
        <div className="mt-6 w-full">
          <label className="text-[#0B0B0B] text-base font-semibold">
            {t("apartmentNo")}
          </label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => handleInputChange("apartment", e.target.value)}
            className="w-full h-14 border border-[#DEDDDD] rounded-4xl px-4 mt-3"
            placeholder={t("enterApartmentNo")}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="md:mt-10 mt-6 w-full md:h-14 h-12 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending && <Loader2 className="animate-spin w-5 h-5" />}
        {isPending ? t("saving") : t("save")}
      </button>
    </section>
  );
};

export default AddNewAddress;