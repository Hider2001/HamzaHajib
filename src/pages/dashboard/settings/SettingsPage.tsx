/**
 * Settings Page
 * Profile, password, and translations management
 */

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth.service';

type Tab = 'profile' | 'password';

export default function SettingsPage() {
    const { user } = useAuth();
    const { t } = useTranslation();

    const [tab, setTab] = useState<Tab>('profile');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            await authService.updatePassword(newPassword);
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: unknown) {
            setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Update failed' });
        } finally {
            setSaving(false);
        }
    };

    const tabs: { key: Tab; label: string }[] = [
        { key: 'profile', label: t('dashboard.profile', 'Profile') },
        { key: 'password', label: t('dashboard.change_password', 'Change Password') },
    ];

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold text-white">{t('dashboard.settings', 'Settings')}</h1>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl bg-slate-800/50 p-1 border border-slate-700/40 w-fit">
                {tabs.map((t) => (
                    <button key={t.key} onClick={() => setTab(t.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} key={tab}
                className="rounded-xl border border-slate-700/40 p-6" style={{ background: 'rgba(30,41,59,0.5)' }}>

                {/* Profile */}
                {tab === 'profile' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold uppercase">
                                {user?.email?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">{user?.email?.split('@')[0]}</h2>
                                <p className="text-sm text-slate-400">{user?.email}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                            <input type="email" value={user?.email ?? ''} disabled
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-slate-400 text-sm cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">User ID</label>
                            <input type="text" value={user?.id ?? ''} disabled
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-slate-400 text-sm font-mono cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Sign In</label>
                            <input type="text" value={user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—'} disabled
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-slate-400 text-sm cursor-not-allowed" />
                        </div>
                    </div>
                )}

                {/* Password */}
                {tab === 'password' && (
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        {message.text && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-500/15 border border-red-500/30 text-red-300' : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'}`}>
                                {message.text}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">New Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all" />
                        </div>
                        <button type="submit" disabled={saving}
                            className="px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-500/20 disabled:opacity-50 transition-all">
                            {saving ? 'Updating…' : 'Update Password'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
