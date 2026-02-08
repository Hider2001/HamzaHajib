/**
 * Dark Mode Toggle
 * Smooth theme switching with system preference detection
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-3 rounded-full bg-[#F8FAFC] dark:bg-[#1E293B] text-[#0A2540] dark:text-white shadow-lg hover:shadow-xl transition-shadow focus-visible:ring-4 focus-visible:ring-[#38BDF8]/30"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <HiMoon className="w-5 h-5" />
        ) : (
          <HiSun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};
