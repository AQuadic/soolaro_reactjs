import { Image } from "@/components/ui/image";

interface DirhamIconProps {
  className?: string;
}

export const DirhamIcon = ({ className = "w-[18px] h-4" }: DirhamIconProps) => {
  return (
    <Image
      src="/images/checkout/dirham-icon-223e09.svg"
      alt="AED"
      className={className}
    />
  );
};
