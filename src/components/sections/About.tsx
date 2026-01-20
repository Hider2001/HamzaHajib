import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '../ui/RevealOnScroll';

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
        <section id="about" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] mb-6"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('about.title')}
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <p className="text-[#64748B] text-center max-w-3xl mx-auto mb-16 text-lg">
                        {t('about.bio')}
                    </p>
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
                        <div className="bg-[#F8FAFC] rounded-xl p-6">
                            <h4 className="font-semibold text-[#0A2540] mb-4 text-lg">
                                {t('skills.programming')}
                            </h4>
                            <div className="space-y-4">
                                {skills.programming.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#1E293B]">{skill.name}</span>
                                            <span className="text-[#64748B]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-[#CBD5E1] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#0A2540] to-[#38BDF8] rounded-full transition-all duration-1000"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Database Skills */}
                    <RevealOnScroll delay={0.4}>
                        <div className="bg-[#F8FAFC] rounded-xl p-6">
                            <h4 className="font-semibold text-[#0A2540] mb-4 text-lg">
                                {t('skills.databases')}
                            </h4>
                            <div className="space-y-4">
                                {skills.databases.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#1E293B]">{skill.name}</span>
                                            <span className="text-[#64748B]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-[#CBD5E1] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#0A2540] to-[#38BDF8] rounded-full transition-all duration-1000"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Tools */}
                    <RevealOnScroll direction="right" delay={0.5}>
                        <div className="bg-[#F8FAFC] rounded-xl p-6">
                            <h4 className="font-semibold text-[#0A2540] mb-4 text-lg">
                                {t('skills.tools')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="px-3 py-2 bg-[#0A2540] text-white rounded-lg text-sm font-medium"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};
