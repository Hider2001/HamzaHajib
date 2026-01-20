/**
 * Scroll Progress Indicator
 * Shows reading progress at top of page
 */

import { motion, useScroll, useSpring } from 'framer-motion';
import { useDirection } from '@/hooks/useDirection';

export const ScrollProgress = () => {
    const { isRTL } = useDirection();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 inset-x-0 h-1 bg-[#38BDF8] z-[60] origin-left"
            style={{
                scaleX,
                transformOrigin: isRTL ? 'right' : 'left',
            }}
        />
    );
};
