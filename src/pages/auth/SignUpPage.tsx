import SignUpForm from "@/components/auth/signup/SignUpForm";
import { Image } from "@/components/ui/image";

const SignUpPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-8">
        <SignUpForm />
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

export default SignUpPage;
