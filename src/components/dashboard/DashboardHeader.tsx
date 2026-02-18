/**
 * Dashboard Header
 * Top bar with user info, language toggle, and actions
 */

import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
    onMenuToggle: () => void;
}

export const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
    const { user, signOut } = useAuth();
    const { i18n } = useTranslation();

    const isRTL = i18n.language === 'ar';
    const displayName = user?.email?.split('@')[0] || 'Admin';

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
            {/* Left: Mobile menu button */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Language toggle */}
                <button
                    onClick={() => i18n.changeLanguage(isRTL ? 'en' : 'ar')}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider
                               bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white
                               border border-slate-600/30 transition-all duration-200"
                >
                    {isRTL ? 'EN' : 'AR'}
                </button>

                {/* User info */}
                <motion.div
                    className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-800/40 border border-slate-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                        {displayName.charAt(0)}
                    </div>
                    <span className="text-sm text-slate-300 hidden sm:block">{displayName}</span>
                </motion.div>

                {/* Sign out */}
                <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400 transition-all duration-200"
                    title="Sign Out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </header>
    );
};
