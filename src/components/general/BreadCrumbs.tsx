import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadCrumbItem {
  nameEn: string;
  nameAr: string;
  Link?: string;
}

interface BreadCrumbsProps {
  items: BreadCrumbItem[];
  hideOnMobile?: boolean;
}

const BreadCrumbs = ({ items, hideOnMobile = false }: BreadCrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${hideOnMobile ? "hidden md:block" : "block"} container py-6 md:py-10`}
    >
      <ol className="flex items-center gap-1.5 md:gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          // Assuming English for now, but nameAr is available for i18n
          const name = item.nameEn;

          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              {item.Link && !isLast ? (
                <Link
                  to={item.Link}
                  className="text-sm md:text-[14px] text-[#0B0B0B] hover:text-[#003D3B] transition-colors font-medium cursor-pointer"
                >
                  {name}
                </Link>
              ) : (
                <span
                  className={`text-sm md:text-[14px] ${
                    isLast
                      ? "text-[#0B0B0B] font-medium"
                      : "text-[#717171] font-normal"
                  }`}
                >
                  {name}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="w-4 h-4 text-[#0B0B0B] rtl:rotate-180"
                  strokeWidth={1.5}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
