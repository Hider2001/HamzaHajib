import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { motion } from 'framer-motion';

const skills = {
    programming: [
        { name: 'HTML5 / CSS3', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'React.js', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'Flutter / Dart', level: 80 },
        { name: 'C#', level: 75 },
        { name: 'PHP', level: 70 },
    ],
    databases: [
        { name: 'SQL Server', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'SQLite', level: 75 },
        { name: 'Firebase', level: 80 },
    ],
    tools: ['Git & GitHub', 'VS Code', 'Figma', 'Postman', 'Docker', 'Linux'],
};

export const About = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-24 bg-white dark:bg-[#0F172A] transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] dark:text-white mb-6"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('about.title')}
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <p className="text-[#64748B] dark:text-[#94A3B8] text-center max-w-3xl mx-auto mb-12 text-lg">
                        {t('about.bio')}
                    </p>
                </RevealOnScroll>

                {/* Stats Section */}
                <RevealOnScroll delay={0.15}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { value: 50, suffix: '+', label: 'Projects Completed' },
                            { value: 8, suffix: '+', label: 'Years Experience' },
                            { value: 15, suffix: '+', label: 'Technologies' },
                            { value: 100, suffix: '%', label: 'Client Satisfaction' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gradient-to-br from-[#0A2540] to-[#38BDF8] dark:from-[#38BDF8] dark:to-[#0A2540] rounded-xl p-6 text-center text-white shadow-lg"
                            >
                                <div className="text-4xl font-bold mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2 + index * 0.2} />
                                </div>
                                <div className="text-sm opacity-90">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Skills */}
                <RevealOnScroll delay={0.2}>
                    <h3
                        className="text-2xl font-bold text-[#0A2540] mb-8 text-center"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('skills.title')}
                    </h3>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Programming Skills */}
                    <RevealOnScroll direction="left" delay={0.3}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                        >
                            <h4 className="font-semibold text-[#0A2540] dark:text-white mb-4 text-lg">
                                {t('skills.programming')}
                            </h4>
                            <div className="space-y-4">
                                {skills.programming.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#1E293B] dark:text-white">{skill.name}</span>
                                            <span className="text-[#64748B] dark:text-[#94A3B8]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2.5 bg-[#CBD5E1] dark:bg-[#334155] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#0A2540] to-[#38BDF8] rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </RevealOnScroll>

                    {/* Database Skills */}
                    <RevealOnScroll delay={0.4}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                        >
                            <h4 className="font-semibold text-[#0A2540] dark:text-white mb-4 text-lg">
                                {t('skills.databases')}
                            </h4>
                            <div className="space-y-4">
                                {skills.databases.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#1E293B] dark:text-white">{skill.name}</span>
                                            <span className="text-[#64748B] dark:text-[#94A3B8]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2.5 bg-[#CBD5E1] dark:bg-[#334155] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#0A2540] to-[#38BDF8] rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </RevealOnScroll>

                    {/* Tools */}
                    <RevealOnScroll direction="right" delay={0.5}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                        >
                            <h4 className="font-semibold text-[#0A2540] dark:text-white mb-4 text-lg">
                                {t('skills.tools')}
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {skills.tools.map((tool, index) => (
                                    <motion.span
                                        key={tool}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className="px-4 py-2 bg-gradient-to-r from-[#0A2540] to-[#38BDF8] text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg cursor-default"
                                    >
                                        {tool}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};
