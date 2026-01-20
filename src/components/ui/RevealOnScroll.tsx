import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useDirection } from '@/hooks/useDirection';

interface RevealOnScrollProps {
    children: ReactNode;
    direction?: 'up' | 'left' | 'right' | 'scale';
    delay?: number;
    className?: string;
}

export const RevealOnScroll = ({
    children,
    direction = 'up',
    delay = 0,
    className = '',
}: RevealOnScrollProps) => {
    const { isRTL } = useDirection();

    const variants = {
        up: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
        },
        left: {
            hidden: { opacity: 0, x: isRTL ? 30 : -30 },
            visible: { opacity: 1, x: 0 },
        },
        right: {
            hidden: { opacity: 0, x: isRTL ? -30 : 30 },
            visible: { opacity: 1, x: 0 },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
        },
    };

    return (
        <motion.div
            className={className}
            variants={variants[direction]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};
