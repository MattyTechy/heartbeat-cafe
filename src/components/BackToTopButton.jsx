import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTopButton = ({ hide }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && !hide && (
        <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="
                fixed bottom-6 right-6 z-50
                w-12 h-12
                flex items-center justify-center
                rounded-full shadow-lg
                bg-gray-900 text-white
                dark:bg-[#F5EFE6] dark:text-[#3B2F2F]
                hover:bg-gray-800 dark:hover:bg-white
                focus:outline-none focus:ring-2 focus:ring-orange-500
                cursor-pointer
            "
        >
            ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
