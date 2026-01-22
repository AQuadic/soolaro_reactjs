import OtpForm from "@/components/auth/otp/OtpForm";

const OtpPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-8">
        <OtpForm />
      </div>

      <div className="hidden lg:block lg:flex-1 relative">
        <div className="sticky top-0 h-screen">
          <img
            src="/images/auth/auth_bg.jpg"
            alt="bg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
