import OtpForm from "@/components/auth/otp/OtpForm";
import { Image } from "@/components/ui/image";

const OtpPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-12">
        <OtpForm />
      </div>

      <div className="hidden lg:block w-[500px] relative">
        <div className="sticky top-0 h-screen bg-[#BEE5E7]">
          <Image
            src="/images/auth/auth_bg.jpg"
            alt="bg"
            className="w-full h-full object-cover opacity-15"
            wrapperClassName="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
