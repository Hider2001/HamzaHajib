/**
 * Contact Section Component
 * Uses useContactForm hook for clean separation
 */

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { useContactForm } from '@/hooks';

export const Contact = () => {
    const { t } = useTranslation();
    const { submit, status } = useContactForm();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await submit(formData);

        // Clear form on success
        if (status !== 'error') {
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#F8FAFC]">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] mb-4"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('contact.title')}
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <p className="text-[#64748B] text-center mb-12">
                        {t('contact.subtitle')}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder={t('contact.name')}
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all bg-white"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder={t('contact.email')}
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all bg-white"
                            />
                        </div>

                        <div>
                            <textarea
                                name="message"
                                placeholder={t('contact.message')}
                                rows={5}
                                required
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all resize-none bg-white"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                            whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                            className="w-full py-4 bg-[#0A2540] text-white font-semibold rounded-lg hover:bg-[#0A2540]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? t('contact.sending') : t('contact.submit')}
                        </motion.button>

                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center text-green-600 font-medium"
                            >
                                ✓ {t('contact.success')}
                            </motion.p>
                        )}

                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center text-red-600 font-medium"
                            >
                                ✗ {t('contact.error')}
                            </motion.p>
                        )}
                    </form>
                </RevealOnScroll>
            </div>
        </section>
    );
};
