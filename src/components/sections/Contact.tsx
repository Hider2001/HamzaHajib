/**
 * Contact Section Component
 * Uses useContactForm hook for clean separation
 */

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { useContactForm } from '@/hooks';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

export const Contact = () => {
    const { t } = useTranslation();
    const { submit, status } = useContactForm();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await submit(formData);

        // Show toast notification
        if (status === 'success') {
            showToast(t('contact.success'), 'success');
            setFormData({ name: '', email: '', message: '' });
        } else if (status === 'error') {
            showToast(t('contact.error'), 'error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#F8FAFC] dark:bg-[#0A2540] transition-colors duration-300">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center text-[#0A2540] dark:text-white mb-4"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('contact.title')}
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <p className="text-[#64748B] dark:text-[#94A3B8] text-center mb-12">
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
                                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-white placeholder:text-[#94A3B8]"
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
                                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-white placeholder:text-[#94A3B8]"
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
                                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all resize-none bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-white placeholder:text-[#94A3B8]"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="gradient"
                            size="lg"
                            fullWidth
                            loading={status === 'loading'}
                        >
                            {status === 'loading' ? t('contact.sending') : t('contact.submit')}
                        </Button>
                    </form>
                </RevealOnScroll>
            </div>
        </section>
    );
};
