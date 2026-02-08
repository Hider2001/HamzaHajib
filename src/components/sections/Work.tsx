/**
 * Work Section Component
 * Uses useProjects and useCategories hooks for clean separation
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { useProjects, useCategories } from '@/hooks';
import { getLocalizedField, type Language } from '@/types';

export const Work = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as Language;

    const { categories, loading: catsLoading } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { projects, loading: projsLoading, error } = useProjects(selectedCategory);

    const loading = catsLoading || projsLoading;

    return (
        <section id="work" className="py-24 bg-[#F8FAFC] dark:bg-[#0A2540] transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] dark:text-white mb-8"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('work.title')}
                    </h2>
                </RevealOnScroll>

                {/* Category Filter */}
                <RevealOnScroll delay={0.1}>
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedCategory(null)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${!selectedCategory
                                    ? 'bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white shadow-lg'
                                    : 'bg-white dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] shadow-md'}`}
                        >
                            {t('work.filterAll')}
                        </motion.button>

                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedCategory(cat.key)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === cat.key
                                        ? 'bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white shadow-lg'
                                        : 'bg-white dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] shadow-md'}`}
                            >
                                {getLocalizedField(cat, 'name', lang)}
                            </motion.button>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    {loading ? (
                        // Loading Skeletons
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-full">
                                <div className="skeleton w-full aspect-video" />
                                <div className="p-6 space-y-3">
                                    <div className="skeleton h-6 w-3/4" />
                                    <div className="skeleton h-4 w-full" />
                                    <div className="skeleton h-4 w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : error ? (
                        <div className="col-span-full text-center py-12 text-red-500">
                            <p>{error}</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-[#64748B]">
                            <p>{t('errors.not_found')}</p>
                        </div>
                    ) : (
                        // Real Projects
                        projects.map((project, index) => (
                            <RevealOnScroll key={project.id} delay={index * 0.1}>
                                <motion.article
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="group bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
                                >
                                    <div className="relative overflow-hidden aspect-video">
                                        <motion.img
                                            src={project.thumbnail_url || 'https://via.placeholder.com/800x450'}
                                            alt={getLocalizedField(project, 'title', lang)}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-[#0A2540]/40 to-transparent flex items-end justify-center pb-4"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="text-white font-semibold text-sm px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                                                View Details →
                                            </span>
                                        </motion.div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3
                                            className="text-lg font-semibold text-[#0A2540] dark:text-white mb-2 group-hover:text-[#38BDF8] transition-colors"
                                            style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                                        >
                                            {getLocalizedField(project, 'title', lang)}
                                        </h3>
                                        <p className="text-[#64748B] dark:text-[#94A3B8] text-sm line-clamp-2 mb-4 flex-grow">
                                            {getLocalizedField(project, 'summary', lang)}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.project_tags?.map(({ tags }) => (
                                                <motion.span
                                                    key={tags.name_en}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="px-3 py-1 text-xs bg-gradient-to-r from-[#0A2540]/10 to-[#38BDF8]/10 dark:from-[#38BDF8]/20 dark:to-[#0A2540]/20 text-[#0A2540] dark:text-[#38BDF8] rounded-full font-medium border border-[#0A2540]/20 dark:border-[#38BDF8]/30"
                                                >
                                                    {getLocalizedField(tags, 'name', lang)}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            </RevealOnScroll>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};
