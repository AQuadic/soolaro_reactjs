import ForgetPassForm from "@/components/auth/forget_password/ForgetPassForm";
import { Image } from "@/components/ui/image";

const ForgetPasswordPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-12">
        <ForgetPassForm />
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

export default ForgetPasswordPage;
