import Arrow from "../icons/home/hero/Arrow";
import HomeSlider from "./HomeSlider";
import { motion } from "framer-motion";

const HomeHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[linear-gradient(180deg,#A8D4D3_0%,#D1E8E7_59.27%,#FEFEFE_100%)]">
      <div className="container flex lg:flex-row flex-col items-start justify-between gap-8 overflow-hidden py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={itemVariants}
            className="md:w-125 w-75 text-[#0B0B0B] md:text-[48px] text-2xl font-semibold leading-[150%]"
          >
            Premium <span className="text-[#025D5B]">Eyewear </span> for Style
            and <span className="text-[#025D5B]">Comfort!</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="md:w-146 text-[#3B3B3B] md:text-xl text-xs font-medium leading-[150%] mt-3"
          >
            Explore a curated collection of glasses that combine modern design,
            superior quality, and everyday comfort. Find the perfect pair that
            suits your style and enhances your vision."
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:w-102.75 w-full md:h-14 h-12 rounded-[100px] bg-[#018884] mt-6 relative"
          >
            <p className="text-[#FEFEFE] md:text-lg text-base font-semibold">
              Explore Shop
            </p>
            <div className="absolute md:-top-2 -top-1 md:-right-2 -right-1">
              <Arrow />
            </div>
          </motion.button>

          <motion.div
            variants={itemVariants}
            className="mt-4 md:flex hidden items-center gap-4"
          >
            <div className="flex items-center">
              <img
                src="/images/home/customer.jpg"
                alt="customer"
                className="w-14 h-14 rounded-full border-2 border-white"
              />
              <img
                src="/images/home/customer.jpg"
                alt="customer"
                className="w-14 h-14 rounded-full border-2 border-white -ml-6"
              />
              <img
                src="/images/home/customer.jpg"
                alt="customer"
                className="w-14 h-14 rounded-full border-2 border-white -ml-6"
              />
              <img
                src="/images/home/customer.jpg"
                alt="customer"
                className="w-14 h-14 rounded-full border-2 border-white -ml-6"
              />
            </div>

            <div>
              <h3 className="text-[#0B0B0B] text-2xl font-medium leading-none">
                +50K
              </h3>
              <p className="text-[#3B3B3B] text-sm font-medium mt-2 leading-none">
                Satisfied Customer
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <HomeSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
