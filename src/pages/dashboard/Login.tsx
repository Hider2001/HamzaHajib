/**
 * Dashboard Login Page
 * Premium, animated login form with bilingual support
 */

import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { signIn, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const isRTL = i18n.language === 'ar';
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await signIn(email, password);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Login failed';
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const isLoading = submitting || authLoading;

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
                />
                <div
                    className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full opacity-5"
                    style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)' }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Glass card */}
                <div
                    className="rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10"
                    style={{
                        background: 'rgba(30, 41, 59, 0.8)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                            style={{ background: 'linear-gradient(135deg, #38BDF8, #818CF8)' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </motion.div>
                        <h1 className="text-2xl font-bold text-white mb-1">
                            {t('dashboard.login_title', 'Admin Dashboard')}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {t('dashboard.login_subtitle', 'Sign in to manage your portfolio')}
                        </p>
                    </div>

                    {/* Error banner */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                {t('dashboard.email', 'Email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white placeholder-slate-500 
                                           focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-sky-400/60
                                           disabled:opacity-50 transition-all duration-200"
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                {t('dashboard.password', 'Password')}
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white placeholder-slate-500 
                                           focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-sky-400/60
                                           disabled:opacity-50 transition-all duration-200"
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl font-semibold text-white
                                       bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400
                                       focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-slate-900
                                       disabled:opacity-50 disabled:cursor-not-allowed
                                       transition-all duration-200 shadow-lg shadow-sky-500/25"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    {t('dashboard.signing_in', 'Signing in…')}
                                </span>
                            ) : (
                                t('dashboard.sign_in', 'Sign In')
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-slate-500 hover:text-sky-400 transition-colors"
                        >
                            ← {t('dashboard.back_to_site', 'Back to Portfolio')}
                        </a>
                    </div>
                </div>

                {/* Language toggle */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => i18n.changeLanguage(isRTL ? 'en' : 'ar')}
                        className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                        {isRTL ? 'English' : 'العربية'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
