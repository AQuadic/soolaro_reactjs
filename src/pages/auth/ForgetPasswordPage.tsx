import ForgetPassForm from "@/components/auth/forget_password/ForgetPassForm";
import { Image } from "@/components/ui/image";

const ForgetPasswordPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-8">
        <ForgetPassForm />
      </div>

      <div className="hidden lg:block lg:flex-1 relative">
        <div className="sticky top-0 h-screen">
          <Image
            src="/images/auth/auth_bg.jpg"
            alt="bg"
            className="w-full h-full object-cover"
            wrapperClassName="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
