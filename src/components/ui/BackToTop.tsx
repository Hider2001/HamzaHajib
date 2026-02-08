/**
 * Back to Top Button
 * Smooth scroll with elegant animations
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 end-8 z-50 p-4 bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white rounded-full shadow-2xl hover:shadow-3xl transition-shadow focus-visible:ring-4 focus-visible:ring-[#38BDF8]/50"
          aria-label="Back to top"
        >
          <HiArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
