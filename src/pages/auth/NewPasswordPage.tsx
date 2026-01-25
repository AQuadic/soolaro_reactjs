import NewPasswordFrom from "@/components/auth/new_password/NewPasswordFrom";
import { Image } from "@/components/ui/image";

const NewPasswordPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center py-8">
        <NewPasswordFrom />
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

export default NewPasswordPage;
