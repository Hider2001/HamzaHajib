/**
 * Contact Section Component - World-Class UI/UX Edition
 * Features: Modern form design, floating labels, animations, social links
 */

import { useState, useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useContactForm } from '@/hooks';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { HiMail, HiUser, HiChat, HiPaperAirplane, HiLocationMarker, HiPhone, HiClock, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter } from 'react-icons/fa';

// ============================================
// FLOATING INPUT COMPONENT
// ============================================
const FloatingInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    required = true,
    icon: Icon,
    multiline = false
}: {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    icon: React.ComponentType<{ className?: string }>;
    multiline?: boolean;
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;

    const inputClasses = `
        w-full px-4 py-4 pt-6 rounded-xl border-2 
        bg-white dark:bg-[#1E293B] 
        text-[#1E293B] dark:text-white 
        transition-all duration-300 outline-none
        ${isFocused ? 'border-[#38BDF8] shadow-lg shadow-[#38BDF8]/10' : 'border-gray-200 dark:border-gray-700'}
        ${multiline ? 'min-h-[150px] resize-none' : ''}
    `;

    const labelClasses = `
        absolute start-12 transition-all duration-300 pointer-events-none
        ${isFocused || hasValue
            ? 'top-2 text-xs text-[#38BDF8]'
            : 'top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
        }
        ${multiline && (isFocused || hasValue) ? 'top-3' : ''}
    `;

    return (
        <div className="relative group">
            {/* Icon */}
            <div className={`absolute start-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${multiline ? 'top-6 !translate-y-0' : ''}`}>
                <Icon className={`text-xl transition-colors duration-300 ${isFocused ? 'text-[#38BDF8]' : 'text-gray-400 dark:text-gray-500'}`} />
            </div>

            {/* Input/Textarea */}
            {multiline ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    className={inputClasses}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    className={inputClasses}
                />
            )}

            {/* Floating Label */}
            <label className={labelClasses}>
                {label}
            </label>

            {/* Focus Border Animation */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#6366f1] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

// ============================================
// CONTACT INFO CARD COMPONENT
// ============================================
const ContactInfoCard = ({
    icon: Icon,
    title,
    value,
    link,
    delay
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string;
    link?: string;
    delay: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    const content = (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-[#1E293B] shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
        >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8]/20 to-[#6366f1]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-lg text-[#38BDF8]" />
            </div>

            {/* Content */}
            <div>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{title}</p>
                <p className="font-medium text-[#0A2540] dark:text-white group-hover:text-[#38BDF8] transition-colors text-sm">
                    {value}
                </p>
            </div>
        </motion.div>
    );

    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return content;
};

// ============================================
// SOCIAL LINK BUTTON COMPONENT
// ============================================
const SocialLinkButton = ({
    icon: Icon,
    label,
    href,
    color,
    delay
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    color: string;
    delay: number;
}) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, delay }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ backgroundColor: color }}
            aria-label={label}
        >
            <Icon className="text-lg" />
        </motion.a>
    );
};

// ============================================
// SECTION HEADER COMPONENT
// ============================================
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38BDF8]/10 dark:bg-[#38BDF8]/20 text-[#38BDF8] text-sm font-medium mb-5"
            >
                <HiMail className="text-base" />
                <span>Get In Touch</span>
            </motion.div>

            {/* Title */}
            <h2
                className="text-3xl sm:text-4xl font-bold text-[#0A2540] dark:text-white mb-4"
                style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
            >
                {title}
            </h2>

            {/* Subtitle */}
            <p className="text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto text-base">
                {subtitle}
            </p>

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
// SUCCESS MESSAGE COMPONENT
// ============================================
const SuccessMessage = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className="text-center py-12"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
        >
            <HiCheckCircle className="text-4xl text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">
            Message Sent!
        </h3>
        <p className="text-[#64748B] dark:text-[#94A3B8]">
            Thank you for reaching out. I'll get back to you soon!
        </p>
    </motion.div>
);

// ============================================
// MAIN CONTACT COMPONENT
// ============================================
export const Contact = () => {
    const { t } = useTranslation();
    const { submit, status } = useContactForm();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(formRef, { once: true });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await submit(formData);

        if (status === 'success') {
            showToast(t('contact.success'), 'success');
            setFormData({ name: '', email: '', message: '' });
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        } else if (status === 'error') {
            showToast(t('contact.error'), 'error');
        }
    };

    const contactInfo = [
        { icon: HiLocationMarker, title: 'Location', value: 'Yemen, Sana\'a' },
        { icon: HiMail, title: 'Email', value: 'hamzafuad2001@gmail.com', link: 'mailto:hamzafuad2001@gmail.com' },
        { icon: HiPhone, title: 'Phone', value: '+967 776 645 280', link: 'tel:+967776645280' },
        { icon: HiClock, title: 'Working Hours', value: 'Sun - Thu, 9AM - 6PM' },
    ];

    const socialLinks = [
        { icon: FaGithub, label: 'GitHub', href: 'https://github.com', color: '#333' },
        { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0077B5' },
        { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/967776645280', color: '#25D366' },
        { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com', color: '#1DA1F2' },
    ];

    return (
        <section id="contact" className="py-32 bg-gradient-to-b from-white to-[#F8FAFC] dark:from-[#0F172A] dark:to-[#0A2540] transition-colors duration-300 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <SectionHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column - Contact Info */}
                    <div className="space-y-6">
                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <ContactInfoCard
                                    key={info.title}
                                    {...info}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="pt-6"
                        >
                            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-4">
                                Connect with me:
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map((link, index) => (
                                    <SocialLinkButton key={link.label} {...link} delay={0.6 + index * 0.1} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                    >
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <SuccessMessage />
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <FloatingInput
                                        label={t('contact.name')}
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        icon={HiUser}
                                    />

                                    {/* Email Input */}
                                    <FloatingInput
                                        label={t('contact.email')}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        icon={HiMail}
                                    />

                                    {/* Message Input */}
                                    <FloatingInput
                                        label={t('contact.message')}
                                        name="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        icon={HiChat}
                                        multiline
                                    />

                                    {/* Submit Button */}
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            size="lg"
                                            fullWidth
                                            loading={status === 'loading'}
                                            icon={<HiPaperAirplane className="w-5 h-5 rotate-90" />}
                                            iconPosition="right"
                                            className="shadow-lg shadow-[#38BDF8]/20 hover:shadow-[#38BDF8]/40"
                                        >
                                            {status === 'loading' ? t('contact.sending') : t('contact.submit')}
                                        </Button>
                                    </motion.div>

                                    {/* Status Messages */}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 text-red-500 text-sm"
                                        >
                                            <HiExclamationCircle className="text-lg" />
                                            <span>{t('contact.error')}</span>
                                        </motion.div>
                                    )}
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
