import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface Project {
    id: string;
    slug: string;
    title_en: string;
    title_ar: string;
    summary_en: string;
    summary_ar: string;
    thumbnail: string;
    tags: string[];
    category: string;
}

// Sample projects data - replace with API/Supabase fetch later
const projects: Project[] = [
    {
        id: '1',
        slug: 'harvey-delivery-app',
        title_en: 'Harvey Delivery App',
        title_ar: 'تطبيق هارفي للتوصيل',
        summary_en: 'Cross-platform delivery management application built with Flutter and Firebase.',
        summary_ar: 'تطبيق إدارة التوصيل متعدد المنصات مبني بـ Flutter و Firebase.',
        thumbnail: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800',
        tags: ['Flutter', 'Firebase', 'Dart'],
        category: 'mobile',
    },
    {
        id: '2',
        slug: 'business-dashboard',
        title_en: 'Business Dashboard',
        title_ar: 'لوحة معلومات الأعمال',
        summary_en: 'Admin dashboard for real-time business analytics and reporting.',
        summary_ar: 'لوحة تحكم إدارية للتحليلات والتقارير في الوقت الحقيقي.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        tags: ['React', 'SQL Server', 'Node.js'],
        category: 'dashboard',
    },
    {
        id: '3',
        slug: 'ecommerce-platform',
        title_en: 'E-Commerce Platform',
        title_ar: 'منصة التجارة الإلكترونية',
        summary_en: 'Full-featured online store with payment integration and inventory management.',
        summary_ar: 'متجر إلكتروني متكامل مع بوابات الدفع وإدارة المخزون.',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        category: 'web',
    },
];

export const Work = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';

    return (
        <section id="work" className="py-24 bg-[#F8FAFC]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] mb-12"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('work.title')}
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <RevealOnScroll key={project.id} delay={index * 0.1}>
                            <motion.article
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={project.thumbnail}
                                        alt={lang === 'ar' ? project.title_ar : project.title_en}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="p-6">
                                    <h3
                                        className="text-lg font-semibold text-[#0A2540] mb-2"
                                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                                    >
                                        {lang === 'ar' ? project.title_ar : project.title_en}
                                    </h3>
                                    <p className="text-[#64748B] text-sm line-clamp-2 mb-4">
                                        {lang === 'ar' ? project.summary_ar : project.summary_en}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-xs bg-[#CBD5E1] text-[#0A2540] rounded font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};
