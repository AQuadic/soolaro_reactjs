import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/home/category";
import { Skeleton } from "@/components/ui/skeleton";
import { getResponsiveImageUrl } from "@/lib/utils/imageUtils";

const ShopByCategory = () => {
  const { t, i18n } = useTranslation("home");
  const lang = i18n.language === "ar" ? "ar" : "en";

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isLoading) {
    return (
      <section className="md:py-17 py-10 container">
        <Skeleton className="h-[40px] md:h-[50px] w-[250px] rounded-lg" />

        <div className="md:mt-12 mt-6">
          <div className="flex gap-8">
            <div className="flex-[3]">
              <Skeleton className="w-full md:h-107 h-35.25 rounded-4xl" />
            </div>

            <div className="flex-[2]">
              <Skeleton className="w-full md:h-107 h-35.25 rounded-4xl" />
            </div>
          </div>

          <Skeleton className="w-full md:h-107 h-39.5 rounded-4xl md:mt-10 mt-4" />
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  const [first, second, third] = categories;

  return (
    <section className="md:py-17 py-10 container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold"
      >
        {t("shop_by_category")}
      </motion.h2>

      <div className="md:mt-12 mt-6">
        <div className="flex gap-8">
          {first && (
            <Link to={`/category?parent_id=${first.id}`} className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-4xl group flex-[3]"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={getResponsiveImageUrl(first.image, "large")}
                  alt={first.name[lang]}
                  className="w-full md:h-107 h-35.25 bg-[#0000001A] opacity-70 object-cover"
                />
                <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold absolute md:top-6 top-3 md:right-6 right-2">
                  {first.name[lang]}
                </h2>
              </motion.div>
            </Link>
          )}

          {second && (
            <Link to={`/category?parent_id=${second.id}`} className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-4xl group flex-[2]"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={getResponsiveImageUrl(second.image, "large")}
                  alt={second.name[lang]}
                  className="w-full md:h-107 h-35.25 bg-[#0000001A] opacity-70 object-cover"
                />
                <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold absolute md:bottom-6 bottom-3 md:left-6 left-2">
                  {second.name[lang]}
                </h2>
              </motion.div>
            </Link>
          )}
        </div>

        {third && (
          <Link to={`/category?parent_id=${third.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-4xl md:mt-10 mt-4 group"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={getResponsiveImageUrl(third.image, "large")}
                alt={third.name[lang]}
                className="w-full md:h-107 h-39.5 bg-[#0000001A] opacity-70 object-cover"
              />
              <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold absolute md:top-6 top-3 md:left-6 left-2">
                {third.name[lang]}
              </h2>
            </motion.div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;
