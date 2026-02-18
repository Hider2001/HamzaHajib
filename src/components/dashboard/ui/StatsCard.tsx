/**
 * StatsCard Component
 * Animated statistics card with icon and count-up animation
 */

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: 'sky' | 'emerald' | 'violet' | 'amber' | 'rose' | 'indigo';
    delay?: number;
}

const colorMap = {
    sky: {
        bg: 'rgba(56,189,248,0.1)',
        border: 'rgba(56,189,248,0.25)',
        icon: '#38BDF8',
        glow: 'rgba(56,189,248,0.15)',
    },
    emerald: {
        bg: 'rgba(52,211,153,0.1)',
        border: 'rgba(52,211,153,0.25)',
        icon: '#34D399',
        glow: 'rgba(52,211,153,0.15)',
    },
    violet: {
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.25)',
        icon: '#8B5CF6',
        glow: 'rgba(139,92,246,0.15)',
    },
    amber: {
        bg: 'rgba(251,191,36,0.1)',
        border: 'rgba(251,191,36,0.25)',
        icon: '#FBBF24',
        glow: 'rgba(251,191,36,0.15)',
    },
    rose: {
        bg: 'rgba(251,113,133,0.1)',
        border: 'rgba(251,113,133,0.25)',
        icon: '#FB7185',
        glow: 'rgba(251,113,133,0.15)',
    },
    indigo: {
        bg: 'rgba(129,140,248,0.1)',
        border: 'rgba(129,140,248,0.25)',
        icon: '#818CF8',
        glow: 'rgba(129,140,248,0.15)',
    },
};

function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);
    const startTime = useRef<number | null>(null);
    const rafId = useRef<number>(0);

    useEffect(() => {
        if (target === 0) { setCount(0); return; }

        const animate = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            const progress = Math.min((timestamp - startTime.current) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.round(eased * target));
            if (progress < 1) rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId.current);
    }, [target, duration]);

    return count;
}

export const StatsCard = ({ icon, title, value, color, delay = 0 }: StatsCardProps) => {
    const c = colorMap[color];
    const animatedValue = useCountUp(value);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02]"
            style={{
                background: c.bg,
                borderColor: c.border,
                boxShadow: `0 4px 24px ${c.glow}`,
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: c.bg, color: c.icon }}
                >
                    {icon}
                </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{animatedValue}</p>
            <p className="text-sm text-slate-400">{title}</p>
        </motion.div>
    );
};
