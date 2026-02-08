import { Link } from "react-router-dom";
import type { Product } from "@/lib/api/products/products";
import { useTranslation } from "react-i18next";

interface SearchResultsProps {
  products: Product[];
  isLoading: boolean;
  searchTerm: string;
  onClose: () => void;
}

const SearchResults = ({
  products,
  isLoading,
  searchTerm,
  onClose,
}: SearchResultsProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center gap-4 p-3 rounded-lg">
            <div className="w-21 h-21 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!searchTerm) {
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#3B3B3B] text-base">
          No products found for "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const variant = product.variants[0];
        const image = variant?.images?.[0] || product.image;

        return (
          <Link
            key={product.id}
            to={`/product_details/${product.id}`}
            onClick={onClose}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-21 h-21 bg-[#F6F6F6] rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={image?.url}
                alt={product.name[currentLang as "en" | "ar"]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[#0B0B0B] font-medium text-lg line-clamp-1">
                {product.name[currentLang as "en" | "ar"]}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                {variant?.has_discount && (
                  <p className="text-[#3B3B3B] text-sm line-through">
                    AED {variant.price}
                  </p>
                )}
                <p className="text-[#018884] text-base font-semibold">
                  AED {variant?.final_price || variant?.price}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
