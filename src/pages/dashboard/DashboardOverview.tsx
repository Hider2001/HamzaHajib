/**
 * Dashboard Overview Page
 * Main landing page with stats, recent activity, and quick actions
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { dashboardService } from '@/services/dashboard.service';
import { StatsCard } from '@/components/dashboard/ui/StatsCard';
import type { DashboardStats, ActivityItem } from '@/types/admin';

export default function DashboardOverview() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    const displayName = user?.email?.split('@')[0] || 'Admin';

    useEffect(() => {
        const load = async () => {
            try {
                const [s, a] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getRecentActivity(),
                ]);
                setStats(s);
                setActivity(a);
            } catch (err) {
                console.error('Failed to load dashboard:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const formatTime = (ts: string) => {
        const diff = Date.now() - new Date(ts).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    const activityIcon = (type: ActivityItem['type']) => {
        switch (type) {
            case 'project_created':
                return (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </div>
                );
            case 'project_updated':
                return (
                    <div className="w-8 h-8 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </div>
                );
            case 'message_received':
                return (
                    <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 rounded-full bg-slate-500/15 flex items-center justify-center text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-white">
                    {t('dashboard.welcome', 'Welcome back')}, {displayName} 👋
                </h1>
                <p className="text-slate-400 mt-1">
                    {t('dashboard.overview_subtitle', "Here's what's happening with your portfolio.")}
                </p>
            </motion.div>

            {/* Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-[130px] rounded-xl skeleton" />
                    ))}
                </div>
            ) : stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatsCard
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>}
                        title={t('dashboard.stats.projects', 'Total Projects')}
                        value={stats.totalProjects}
                        color="sky"
                        delay={0}
                    />
                    <StatsCard
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        title={t('dashboard.stats.new_messages', 'New Messages')}
                        value={stats.newMessages}
                        color="amber"
                        delay={0.1}
                    />
                    <StatsCard
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>}
                        title={t('dashboard.stats.categories', 'Categories')}
                        value={stats.totalCategories}
                        color="violet"
                        delay={0.2}
                    />
                    <StatsCard
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                        title={t('dashboard.stats.tags', 'Tags')}
                        value={stats.totalTags}
                        color="emerald"
                        delay={0.3}
                    />
                </div>
            )}

            {/* Two-column layout: Recent Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="lg:col-span-2 rounded-xl border border-slate-700/50 p-6"
                    style={{ background: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(8px)' }}
                >
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {t('dashboard.recent_activity', 'Recent Activity')}
                    </h2>
                    {loading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-12 rounded-lg skeleton" />
                            ))}
                        </div>
                    ) : activity.length === 0 ? (
                        <p className="text-slate-500 text-sm py-8 text-center">No recent activity</p>
                    ) : (
                        <div className="space-y-3">
                            {activity.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/40 transition-colors">
                                    {activityIcon(item.type)}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-200 truncate">{item.title}</p>
                                        {item.description && (
                                            <p className="text-xs text-slate-500 truncate">{item.description}</p>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500 flex-shrink-0">{formatTime(item.timestamp)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="rounded-xl border border-slate-700/50 p-6"
                    style={{ background: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(8px)' }}
                >
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {t('dashboard.quick_actions', 'Quick Actions')}
                    </h2>
                    <div className="space-y-3">
                        <Link
                            to="/dashboard/projects"
                            className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                            {t('dashboard.actions.new_project', 'Add New Project')}
                        </Link>
                        <Link
                            to="/dashboard/messages"
                            className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {t('dashboard.actions.view_messages', 'View Messages')}
                        </Link>
                        <Link
                            to="/dashboard/media"
                            className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {t('dashboard.actions.upload_media', 'Upload Media')}
                        </Link>
                        <Link
                            to="/dashboard/settings"
                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400 hover:bg-slate-500/20 transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {t('dashboard.actions.settings', 'Settings')}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
