import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useTranslation } from "react-i18next";

interface LoginRequiredPopupProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  onProceed?: () => void;
}

const LoginRequiredPopup = ({
  children,
  isLoggedIn = false,
  onProceed,
}: LoginRequiredPopupProps) => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  // If logged in, just render the children with their original onClick
  if (isLoggedIn) {
    return (
      <div onClick={onProceed} className="contents">
        {children}
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-[400px] p-8 rounded-[20px] flex flex-col items-center"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col items-center gap-6">
          {/* Image */}
          <div className="w-[160px] h-[120px] flex items-center justify-center">
            <Image
              src="/images/cart/loginCartImage.png"
              alt={t("login_required_alt")}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <DialogTitle className="text-[#0B0B0B] text-xl font-semibold text-center">
            {t("login_required_title")}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-[#6B6B6B] text-base font-normal text-center -mt-3">
            {t("login_required_description")}
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="flex flex-row gap-4 mt-8 w-full">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 h-[52px] border border-[#DEDDDD] rounded-full text-[#3B3B3B] text-base font-semibold hover:bg-gray-50 transition-colors"
            >
              {t("cancel")}
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              onClick={handleLogin}
              className="flex-1 h-[52px] bg-[#018884] rounded-full text-white text-base font-semibold hover:bg-[#006F6C] transition-colors"
            >
              {t("login")}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRequiredPopup;
