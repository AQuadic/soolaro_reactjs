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

interface RemoveItemPopupProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const RemoveItemPopup = ({ children, onConfirm }: RemoveItemPopupProps) => {
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
              src="/images/cart/removeCartImage.png"
              alt="Remove item"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <DialogTitle className="text-[#0B0B0B] text-xl font-semibold text-center">
            Remove this Item?
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-[#6B6B6B] text-base font-normal text-center -mt-3">
            Do you really want to remove this item from your cart
          </DialogDescription>
        </DialogHeader>

        {/* Buttons */}
        <DialogFooter className="flex flex-row gap-4 mt-8 w-full">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 h-[52px] border border-[#DEDDDD] rounded-full text-[#3B3B3B] text-base font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 h-[52px] bg-[#CA1010] rounded-full text-white text-base font-semibold hover:bg-[#A80D0D] transition-colors"
            >
              Remove
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveItemPopup;
