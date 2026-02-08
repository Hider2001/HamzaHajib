/**
 * Animated Gradient Blob
 * Modern background decoration
 */

import { motion } from 'framer-motion';

interface GradientBlobProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const sizes = {
  sm: 'w-32 h-32',
  md: 'w-64 h-64',
  lg: 'w-96 h-96',
  xl: 'w-[32rem] h-[32rem]',
};

export const GradientBlob = ({
  className = '',
  color = '#38BDF8',
  size = 'lg',
  animate = true,
}: GradientBlobProps) => {
  return (
    <motion.div
      className={`${sizes[size]} rounded-full blur-3xl opacity-20 ${className}`}
      style={{ backgroundColor: color }}
      animate={
        animate
          ? {
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }
          : {}
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};
