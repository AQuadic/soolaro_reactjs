import { motion } from "framer-motion";

const ShopByCategory = () => {
  return (
    <section className="md:py-17 py-10 container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-[#0B0B0B] md:text-[40px] text-lg font-semibold"
      >
        Shop by category
      </motion.h2>

      <div className="md:mt-12 mt-6">
        <div className="flex gap-8">
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
              src="/images/home/best.jpg"
              alt="best seller"
              className="w-full md:h-107 h-35.25 bg-[#0000001A] opacity-70 object-cover"
            />
            <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold leading-[100%] absolute md:top-6 top-3 md:right-6 right-2">
              Best seller
            </h2>
          </motion.div>
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
              src="/images/home/new.jpg"
              alt="new"
              className="w-full md:h-107 h-35.25 bg-[#0000001A] opacity-70 object-cover"
            />
            <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold leading-[100%] absolute md:bottom-6 bottom-3 md:left-6 left-2">
              New Arrival
            </h2>
          </motion.div>
        </div>
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
            src="/images/home/summer.jpg"
            alt="summer collection"
            className="w-full md:h-107 h-39.5 bg-[#0000001A] opacity-70 object-cover"
          />
          <h2 className="text-[#0B0B0B] md:text-[32px] text-sm font-semibold leading-[100%] absolute md:top-6 top-3 md:left-6 left-2">
            Summer collection
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByCategory;
