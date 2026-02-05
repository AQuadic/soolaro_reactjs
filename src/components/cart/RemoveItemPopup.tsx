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
import { Image } from "@/components/ui/image";
import { useTranslation } from "react-i18next";

interface RemoveItemPopupProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const RemoveItemPopup = ({ children, onConfirm }: RemoveItemPopupProps) => {
  const { t } = useTranslation("cart");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-[400px] p-8 rounded-[20px] flex flex-col items-center"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col items-center gap-6">
          {/* Image */}
          <div className="w-[160px] h-[100px] flex items-center justify-center">
            <Image
              src="/images/cart/remove.gif"
              alt="Remove item"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <DialogTitle className="text-[#0B0B0B] text-xl font-semibold text-center">
            {t('remove_this_item')}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-[#6B6B6B] text-base font-normal text-center -mt-3">
            {t('are_you_sure_remove_item')}
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="flex flex-row gap-4 mt-8 w-full">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 h-[52px] border border-[#DEDDDD] rounded-full text-[#3B3B3B] text-base font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 h-[52px] bg-[#CA1010] rounded-full text-white text-base font-semibold hover:bg-[#A80D0D] transition-colors"
            >
              {t('remove')}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveItemPopup;
