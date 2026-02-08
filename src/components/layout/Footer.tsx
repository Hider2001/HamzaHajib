import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaHeart } from 'react-icons/fa';

export const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com', icon: FaGithub },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: FaLinkedin },
        { name: 'WhatsApp', url: 'https://wa.me/967776645280', icon: FaWhatsapp },
    ];

    const quickLinks = [
        { key: 'home', href: '#' },
        { key: 'work', href: '#work' },
        { key: 'about', href: '#about' },
        { key: 'contact', href: '#contact' },
    ];

    return (
        <footer className="bg-[#0A2540] dark:bg-[#000000] text-white py-12 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 start-0 w-96 h-96 bg-[#38BDF8] rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 end-0 w-96 h-96 bg-[#6366f1] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3
                            className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-[#38BDF8] bg-clip-text text-transparent"
                            style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                        >
                            {t('brand')}
                        </h3>
                        <p className="text-white/70 text-sm mb-2">{t('footer.location')}</p>
                        <p className="text-white/70 text-sm ltr-content hover:text-[#38BDF8] transition-colors">
                            hamzafuad2001@gmail.com
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="font-semibold mb-4 text-[#38BDF8]">
                            {t('footer.quickLinks')}
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map(({ key, href }) => (
                                <li key={key}>
                                    <motion.a
                                        href={href}
                                        whileHover={{ x: 5 }}
                                        className="text-white/70 hover:text-[#38BDF8] transition-colors text-sm inline-block"
                                    >
                                        → {t(`nav.${key}`)}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="font-semibold mb-4 text-[#38BDF8]">
                            {t('footer.connect')}
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-2xl hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all"
                                        aria-label={link.name}
                                    >
                                        <Icon />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="border-t border-white/20 pt-8 text-center"
                >
                    <p className="text-white/60 text-sm flex items-center justify-center gap-2">
                        {t('footer.copyright')} • Made with <FaHeart className="text-red-500 animate-pulse" /> using React & Framer Motion
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};
