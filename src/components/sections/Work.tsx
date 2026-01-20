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
        <section id="work" className="py-24 bg-[#F8FAFC]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] mb-8"
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
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${!selectedCategory
                                    ? 'bg-[#0A2540] text-white'
                                    : 'bg-white text-[#64748B] hover:bg-[#E2E8F0]'}`}
                        >
                            {t('work.filterAll')}
                        </motion.button>

                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(cat.key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === cat.key
                                        ? 'bg-[#0A2540] text-white'
                                        : 'bg-white text-[#64748B] hover:bg-[#E2E8F0]'}`}
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
                                    whileHover={{ y: -8 }}
                                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
                                >
                                    <div className="relative overflow-hidden aspect-video">
                                        <img
                                            src={project.thumbnail_url || 'https://via.placeholder.com/800x450'}
                                            alt={getLocalizedField(project, 'title', lang)}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3
                                            className="text-lg font-semibold text-[#0A2540] mb-2"
                                            style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                                        >
                                            {getLocalizedField(project, 'title', lang)}
                                        </h3>
                                        <p className="text-[#64748B] text-sm line-clamp-2 mb-4 flex-grow">
                                            {getLocalizedField(project, 'summary', lang)}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.project_tags?.map(({ tags }) => (
                                                <span
                                                    key={tags.name_en}
                                                    className="px-2 py-1 text-xs bg-[#CBD5E1]/30 text-[#0A2540] rounded font-medium"
                                                >
                                                    {getLocalizedField(tags, 'name', lang)}
                                                </span>
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
