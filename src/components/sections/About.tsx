/**
 * About Section Component - World-Class UI/UX Edition
 * Features: Clean spacing, breathing room, elegant skill visualizations
 */

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { HiCode, HiDatabase, HiCog, HiLightningBolt, HiAcademicCap, HiBriefcase, HiHeart, HiUser } from 'react-icons/hi';

// ============================================
// SKILL DATA
// ============================================
const skills = {
    programming: [
        { name: 'HTML5 / CSS3', level: 95, color: '#E34F26' },
        { name: 'JavaScript', level: 90, color: '#F7DF1E' },
        { name: 'TypeScript', level: 85, color: '#3178C6' },
        { name: 'React.js', level: 90, color: '#61DAFB' },
        { name: 'Node.js', level: 85, color: '#339933' },
        { name: 'Flutter / Dart', level: 80, color: '#02569B' },
    ],
    databases: [
        { name: 'SQL Server', level: 85, color: '#CC2927' },
        { name: 'MySQL', level: 80, color: '#4479A1' },
        { name: 'PostgreSQL', level: 75, color: '#4169E1' },
        { name: 'Firebase', level: 80, color: '#FFCA28' },
    ],
    tools: [
        { name: 'Git & GitHub', icon: '🔧' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Figma', icon: '🎨' },
        { name: 'Postman', icon: '📮' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Linux', icon: '🐧' },
    ],
};

// ============================================
// STAT CARD COMPONENT
// ============================================
const StatCard = ({
    value,
    suffix,
    label,
    icon: Icon,
    delay
}: {
    value: number;
    suffix: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    delay: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.03, y: -3 }}
            className="relative group"
        >
            {/* Card Content */}
            <div className="relative bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8]/10 to-[#6366f1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-xl text-[#38BDF8]" />
                </div>

                {/* Counter */}
                <div className="text-3xl font-bold text-[#0A2540] dark:text-white mb-1">
                    <AnimatedCounter end={value} suffix={suffix} duration={2 + delay} />
                </div>

                {/* Label */}
                <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">{label}</div>

                {/* Accent Line */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38BDF8] to-[#6366f1] rounded-b-2xl"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};

// ============================================
// SKILL BAR COMPONENT
// ============================================
const SkillBar = ({ skill, index }: { skill: { name: string; level: number; color: string }; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="group"
        >
            <div className="flex justify-between text-sm mb-2.5">
                <span className="text-[#1E293B] dark:text-white font-medium group-hover:text-[#38BDF8] transition-colors">
                    {skill.name}
                </span>
                <span className="text-[#64748B] dark:text-[#94A3B8] font-mono text-xs">
                    {skill.level}%
                </span>
            </div>
            <div className="h-2 bg-[#E2E8F0] dark:bg-[#334155] rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

// ============================================
// SKILL CARD COMPONENT
// ============================================
const SkillCard = ({
    title,
    skills: skillList,
    icon: Icon,
    delay
}: {
    title: string;
    skills: { name: string; level: number; color: string }[];
    icon: React.ComponentType<{ className?: string }>;
    delay: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8]/10 to-[#6366f1]/10 flex items-center justify-center">
                    <Icon className="text-lg text-[#38BDF8]" />
                </div>
                <h4 className="font-semibold text-[#0A2540] dark:text-white text-base">
                    {title}
                </h4>
            </div>

            {/* Skills */}
            <div className="space-y-4">
                {skillList.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

// ============================================
// TOOL TAG COMPONENT
// ============================================
const ToolTag = ({ tool, index }: { tool: { name: string; icon: string }; index: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.08, y: -2 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
            className="px-4 py-2.5 bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg cursor-default inline-flex items-center gap-2"
        >
            <span className="text-base">{tool.icon}</span>
            {tool.name}
        </motion.span>
    );
};

// ============================================
// SECTION HEADER COMPONENT
// ============================================
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38BDF8]/10 dark:bg-[#38BDF8]/15 text-[#38BDF8] text-sm font-medium mb-5"
            >
                <HiUser className="text-base" />
                <span>About Me</span>
            </motion.div>

            {/* Title */}
            <h2
                className="text-3xl sm:text-4xl font-bold text-[#0A2540] dark:text-white mb-4"
                style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
            >
                {title}
            </h2>

            {/* Subtitle */}
            <p className="text-[#64748B] dark:text-[#94A3B8] max-w-3xl mx-auto text-base leading-relaxed">
                {subtitle}
            </p>

            {/* Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-[#38BDF8] to-[#6366f1] rounded-full"
            />
        </motion.div>
    );
};

// ============================================
// MAIN ABOUT COMPONENT
// ============================================
export const About = () => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

    const stats = [
        { value: 50, suffix: '+', label: 'Projects Completed', icon: HiBriefcase },
        { value: 8, suffix: '+', label: 'Years Experience', icon: HiAcademicCap },
        { value: 15, suffix: '+', label: 'Technologies', icon: HiCode },
        { value: 100, suffix: '%', label: 'Client Satisfaction', icon: HiHeart },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="py-32 bg-white dark:bg-[#0F172A] transition-colors duration-300 relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    style={{ y }}
                    className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
                    className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <SectionHeader title={t('about.title')} subtitle={t('about.bio')} />

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            {...stat}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Skills Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h3
                        className="text-3xl font-bold text-[#0A2540] dark:text-white"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('skills.title')}
                    </h3>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Programming Skills */}
                    <SkillCard
                        title={t('skills.programming')}
                        skills={skills.programming}
                        icon={HiCode}
                        delay={0.1}
                    />

                    {/* Database Skills */}
                    <SkillCard
                        title={t('skills.databases')}
                        skills={skills.databases}
                        icon={HiDatabase}
                        delay={0.2}
                    />

                    {/* Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8]/10 to-[#6366f1]/10 flex items-center justify-center">
                                <HiCog className="text-lg text-[#38BDF8]" />
                            </div>
                            <h4 className="font-semibold text-[#0A2540] dark:text-white text-base">
                                {t('skills.tools')}
                            </h4>
                        </div>

                        {/* Tools Grid */}
                        <div className="flex flex-wrap gap-2.5">
                            {skills.tools.map((tool, index) => (
                                <ToolTag key={tool.name} tool={tool} index={index} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Download CV Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white font-semibold shadow-lg shadow-[#38BDF8]/20 hover:shadow-[#38BDF8]/40 transition-all duration-300 inline-flex items-center gap-2.5"
                    >
                        <HiLightningBolt className="text-base" />
                        <span>Download CV</span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
