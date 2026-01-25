import SignUpForm from "@/components/auth/signup/SignUpForm";
import { Image } from "@/components/ui/image";

const SignUpPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-8">
        <SignUpForm />
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

export default SignUpPage;
