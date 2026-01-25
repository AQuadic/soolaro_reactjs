import { PhoneInput, type PhoneValue } from "../ui/PhoneInput";

interface CheckoutContactInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: PhoneValue;
  };
  onChange: (field: string, value: string | PhoneValue) => void;
}

export const CheckoutContactInfo = ({
  formData,
  onChange,
}: CheckoutContactInfoProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* First Name and Last Name Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            First Name
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Last Name
          </label>
          <input
            type="text"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>
      </div>

      {/* Email and Phone Number Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Email
          </label>
          <input
            type="email"
            className="w-full h-12 md:h-14 border border-[#DEDDDD] rounded-[20px] px-4 text-sm md:text-base hover:border-[#018884] focus:outline-none focus:border-[#018884] transition-colors"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <label className="text-[#0B0B0B] text-sm md:text-base font-semibold">
            Phone Number
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={(value) => onChange("phone", value)}
            radius="md"
            className="h-12 md:h-14 rounded-[20px] border-[#DEDDDD]"
          />
        </div>
      </div>
    </div>
  );
};
