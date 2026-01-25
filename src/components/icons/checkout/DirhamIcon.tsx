interface DirhamIconProps {
  className?: string;
}

export const DirhamIcon = ({ className = "w-[18px] h-4" }: DirhamIconProps) => {
  return (
    <img
      src="/images/checkout/dirham-icon-223e09.svg"
      alt="AED"
      className={className}
    />
  );
};
