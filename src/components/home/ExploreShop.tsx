import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ExploreShop = () => {
  const { t } = useTranslation("home");

  return (
    <section className="bg-[#000000] w-full md:h-136 h-67 flex flex-col items-center justify-end md:py-14 py-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-[#FEFEFE] md:text-[40px] text-base font-semibold leading-[100%] text-center"
      >
        {t("explore_hero_text")}
      </motion.h2>

      <Link to='/explore'>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-88.25 md:h-14 h-12 border border-[#FEFEFE] rounded-4xl mt-8 text-[#FEFEFE] text-lg font-semibold cursor-pointer"
        >
          {t("explore_shop")}
        </motion.button>
      </Link>
    </section>
  );
};

export default ExploreShop;
