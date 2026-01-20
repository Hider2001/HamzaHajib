import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com', icon: '🔗' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
        { name: 'WhatsApp', url: 'https://wa.me/967776645280', icon: '📱' },
    ];

    const quickLinks = [
        { key: 'home', href: '#' },
        { key: 'work', href: '#work' },
        { key: 'about', href: '#about' },
        { key: 'contact', href: '#contact' },
    ];

    return (
        <footer className="bg-[#0A2540] text-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3
                            className="text-xl font-bold mb-4"
                            style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                        >
                            {t('brand')}
                        </h3>
                        <p className="text-white/70 text-sm">{t('footer.location')}</p>
                        <p className="text-white/70 text-sm ltr-content">
                            hamzafuad2001@gmail.com
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[#38BDF8]">
                            {t('footer.quickLinks')}
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map(({ key, href }) => (
                                <li key={key}>
                                    <a
                                        href={href}
                                        className="text-white/70 hover:text-[#38BDF8] transition-colors text-sm"
                                    >
                                        {t(`nav.${key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[#38BDF8]">
                            {t('footer.connect')}
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:scale-110 transition-transform"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-white/60 text-sm">{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};
