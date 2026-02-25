/**
 * Work Section Component - World-Class UI/UX Edition
 * Features: Clean spacing, breathing room, elegant card layouts
 */

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useProjects, useCategories } from '@/hooks';
import { getLocalizedField, type Language } from '@/types';
import { HiExternalLink, HiCode, HiEye } from 'react-icons/hi';

// ============================================
// PROJECT CARD COMPONENT
// ============================================
const ProjectCard = ({
    project,
    index,
    lang
}: {
    project: any;
    index: number;
    lang: Language;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[16/10]">
                {/* Main Image */}
                <motion.img
                    src={project.thumbnail_url || 'https://placehold.co/800x500?text=Project+Image'}
                    alt={getLocalizedField(project, 'title', lang)}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
                />

                {/* Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/30 to-transparent"
                    animate={{ opacity: isHovered ? 0.9 : 0.5 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Category Badge */}
                {project.categories && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-5 start-5"
                    >
                        <span className="px-4 py-1.5 text-xs font-medium bg-white/15 backdrop-blur-md text-white rounded-full border border-white/20">
                            {getLocalizedField(project.categories, 'name', lang)}
                        </span>
                    </motion.div>
                )}

                {/* Hover Actions */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center gap-5"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-colors"
                            >
                                <HiEye className="text-xl" />
                            </motion.button>
                            {project.demo_url && (
                                <motion.a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-[#38BDF8] hover:border-[#38BDF8] transition-colors"
                                >
                                    <HiExternalLink className="text-xl" />
                                </motion.a>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Project Number */}
                <div className="absolute bottom-5 end-5">
                    <span className="text-5xl font-bold text-white/10">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Content - Increased padding */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <motion.h3
                    className="text-xl font-bold text-[#0A2540] dark:text-white mb-3 group-hover:text-[#38BDF8] transition-colors duration-300"
                    style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                >
                    {getLocalizedField(project, 'title', lang)}
                </motion.h3>

                {/* Description */}
                <p className="text-[#64748B] dark:text-[#94A3B8] text-sm line-clamp-2 mb-5 flex-grow leading-relaxed">
                    {getLocalizedField(project, 'summary', lang)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.project_tags?.slice(0, 3).map(({ tags }: any) => (
                        <motion.span
                            key={tags.name_en}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className="px-3 py-1.5 text-xs bg-[#F8FAFC] dark:bg-[#334155] text-[#64748B] dark:text-[#94A3B8] rounded-lg font-medium border border-[#E2E8F0] dark:border-[#475569] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] transition-colors"
                        >
                            {getLocalizedField(tags, 'name', lang)}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Bottom Accent Line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38BDF8] via-[#6366f1] to-[#ec4899]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
            />
        </motion.article>
    );
};

// ============================================
// SKELETON CARD COMPONENT
// ============================================
const SkeletonCard = () => (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden shadow-md h-full flex flex-col">
        <div className="skeleton w-full aspect-[16/10]" />
        <div className="p-6 space-y-3 flex-grow">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
            <div className="flex gap-2 mt-4">
                <div className="skeleton h-6 w-16 rounded-lg" />
                <div className="skeleton h-6 w-16 rounded-lg" />
            </div>
        </div>
    </div>
);

// ============================================
// FILTER BUTTON COMPONENT
// ============================================
const FilterButton = ({
    label,
    isActive,
    onClick,
    count
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
    count?: number;
}) => (
    <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2
            ${isActive
                ? 'text-white shadow-lg shadow-[#38BDF8]/20'
                : 'bg-white dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-gray-50 dark:hover:bg-[#334155] shadow-sm hover:shadow-md'
            }`}
    >
        {isActive && (
            <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-gradient-to-r from-[#0A2540] to-[#38BDF8] rounded-xl"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        )}
        <span className="relative z-10">{label}</span>
        {count !== undefined && (
            <span className={`relative z-10 px-2.5 py-0.5 rounded-full text-xs ${
                isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
                {count}
            </span>
        )}
    </motion.button>
);

// ============================================
// SECTION HEADER COMPONENT
// ============================================
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
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
                <HiCode className="text-base" />
                <span>Portfolio</span>
            </motion.div>

            {/* Title */}
            <h2
                className="text-3xl sm:text-4xl font-bold text-[#0A2540] dark:text-white mb-4"
                style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
            >
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto text-base leading-relaxed">
                    {subtitle}
                </p>
            )}

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
// MAIN WORK COMPONENT
// ============================================
export const Work = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as Language;

    const { categories, loading: catsLoading } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { projects, loading: projsLoading, error } = useProjects(selectedCategory);

    const loading = catsLoading || projsLoading;

    return (
        <section id="work" className="py-32 bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#0A2540] dark:to-[#0F172A] transition-colors duration-300 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <SectionHeader title={t('work.title')} subtitle={t('work.subtitle')} />

                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 justify-center mb-16">
                    <FilterButton
                        label={t('work.filterAll')}
                        isActive={!selectedCategory}
                        onClick={() => setSelectedCategory(null)}
                    />

                    {categories.map((cat) => (
                        <FilterButton
                            key={cat.id}
                            label={getLocalizedField(cat, 'name', lang)}
                            isActive={selectedCategory === cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                        />
                    ))}
                </div>

                {/* Projects Grid - Increased gap */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    <AnimatePresence>
                        {loading ? (
                            // Loading Skeletons
                            Array.from({ length: 6 }).map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <SkeletonCard />
                                </motion.div>
                            ))
                        ) : error ? (
                            // Error State
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-full text-center py-20"
                            >
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <span className="text-2xl">⚠️</span>
                                </div>
                                <p className="text-red-500 font-medium">{error}</p>
                            </motion.div>
                        ) : projects.length === 0 ? (
                            // Empty State
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-full text-center py-20"
                            >
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <HiCode className="text-2xl text-gray-400" />
                                </div>
                                <p className="text-[#64748B] dark:text-[#94A3B8]">{t('errors.not_found')}</p>
                            </motion.div>
                        ) : (
                            // Real Projects
                            projects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    lang={lang}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* View All Button */}
                {!loading && projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white font-semibold shadow-lg shadow-[#38BDF8]/20 hover:shadow-[#38BDF8]/40 transition-all duration-300 inline-flex items-center gap-2.5"
                        >
                            <span>View All Projects</span>
                            <HiExternalLink className="text-base" />
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
