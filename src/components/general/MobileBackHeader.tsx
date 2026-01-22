import BackArrow from "@/components/icons/explore/BackArrow";
import { Link } from "react-router-dom";

interface MobileBackHeaderProps {
  title?: string;
  link?: string;
  className?: string;
}

const MobileBackHeader = ({
  title,
  link = "/",
  className = "",
}: MobileBackHeaderProps) => {
  return (
    <div className={`flex items-center gap-4 md:hidden mb-6 ${className}`}>
      <Link
        to={link}
        className="w-12 h-12 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0"
      >
        <BackArrow />
      </Link>
      {title && (
        <h2 className="text-[#0B0B0B] text-base font-bold leading-[100%]">
          {title}
        </h2>
      )}
    </div>
  );
};

export default MobileBackHeader;
